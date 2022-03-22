        <!--  Header  -->
        <header uk-sticky>
            <div class="header_inner">
                <div class="left-side">

                    <!-- Logo -->
                    <div id="logo">
                        <a href="explore.html">
                            <img src="assets/images/logo.png" alt="">
                            <!-- <img src="assets/images/logo-light.png" class="logo_inverse" alt=""> -->
                            <img src="assets/images/logo-mobile.png" class="logo_mobile" alt="">
                        </a>
                    </div>
                    <!-- icon menu for mobile -->
                    <div class="triger" uk-toggle="target: #wrapper ; cls: is-active">
                    </div>

                </div>
                <div class="right-side">

                    <!-- Header search box  -->
                    <div class="header_search">
                        <h2 style="font-weight:bold; font-size:20px" class="text-xl font-semibold text-gray-600 ml-12 "><?php echo $college ?></h2>
                    </div>

                    <div>


                        <!-- profile -->
                        <a href="#">
                            <img src="assets/images/avatars/placeholder.png" class="header_widgets_avatar" alt="">
                        </a>
                        <div uk-drop="mode: click;offset:5" class="header_dropdown profile_dropdown">
                            <ul>
                                <li>
                                    <a href="#" class="user">
                                        <div class="user_avatar">
                                            <img src="assets/images/avatars/placeholder.png" alt="">
                                        </div>
                                        <div class="user_name">
                                            <div> <?php echo $fname." ".$mname." ".$lname; ?> </div>
                                            <span> <?php echo $email?> </span>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <hr>
                                </li>
                                <li>
                                    <a href="settings.php">
                                        <ion-icon name="settings-outline" class="is-icon"></ion-icon>
                                        Account Settings
                                    </a>
                                </li>
                                <li>
                                    <hr>
                                </li>
                                <li>
                                    <a href="logout.php">
                                        <ion-icon name="log-out-outline" class="is-icon"></ion-icon>
                                        Log Out
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>

                </div>
            </div>
        </header>