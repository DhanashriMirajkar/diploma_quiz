/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */

import PluginManager from 'tinymce/core/api/PluginManager';

import * as Commands from './api/Commands';
import * as Keyboard from './core/Keyboard';
import * as Buttons from './ui/Buttons';

/**
 * This class contains all core logic for the nonbreaking plugin.
 *
 * @class tinymce.nonbreaking.Plugin
 * @private
 */

export default (): void => {
  PluginManager.add('nonbreaking', (editor) => {
    Commands.register(editor);
    Buttons.register(editor);
    Keyboard.setup(editor);
  });
};
