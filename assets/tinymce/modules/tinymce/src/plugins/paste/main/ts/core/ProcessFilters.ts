/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */

import Editor from 'tinymce/core/api/Editor';
import DomParser from 'tinymce/core/api/html/DomParser';
import HtmlSerializer from 'tinymce/core/api/html/Serializer';
import Tools from 'tinymce/core/api/util/Tools';

import * as Events from '../api/Events';
import * as Settings from '../api/Settings';
import * as WordFilter from './WordFilter';

interface ProcessResult {
  readonly content: string;
  readonly cancelled: boolean;
}

const preProcess = (editor: Editor, html: string): string => {
  const parser = DomParser({ }, editor.schema);

  // Strip meta elements
  parser.addNodeFilter('meta', (nodes) => {
    Tools.each(nodes, (node) => {
      node.remove();
    });
  });

  const fragment = parser.parse(html, { forced_root_block: false, isRootContent: true });
  return HtmlSerializer({ validate: Settings.getValidate(editor) }, editor.schema).serialize(fragment);
};

const processResult = (content: string, cancelled: boolean): ProcessResult => ({ content, cancelled });

const postProcessFilter = (editor: Editor, html: string, internal: boolean, isWordHtml: boolean): ProcessResult => {
  const tempBody = editor.dom.create('div', { style: 'display:none' }, html);
  const postProcessArgs = Events.firePastePostProcess(editor, tempBody, internal, isWordHtml);
  return processResult(postProcessArgs.node.innerHTML, postProcessArgs.isDefaultPrevented());
};

const filterContent = (editor: Editor, content: string, internal: boolean, isWordHtml: boolean): ProcessResult => {
  const preProcessArgs = Events.firePastePreProcess(editor, content, internal, isWordHtml);

  // Filter the content to remove potentially dangerous content (eg scripts)
  const filteredContent = preProcess(editor, preProcessArgs.content);

  if (editor.hasEventListeners('PastePostProcess') && !preProcessArgs.isDefaultPrevented()) {
    return postProcessFilter(editor, filteredContent, internal, isWordHtml);
  } else {
    return processResult(filteredContent, preProcessArgs.isDefaultPrevented());
  }
};

const process = (editor: Editor, html: string, internal: boolean): ProcessResult => {
  const isWordHtml = WordFilter.isWordContent(html);
  const content = isWordHtml ? WordFilter.preProcess(editor, html) : html;

  return filterContent(editor, content, internal, isWordHtml);
};

export {
  process
};
