<?php
/**
 * Custom local DashBoard for WPCA
 */
?>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>WP Customer Area - Publish private content, the easy way</title>
    <style>

        html, body {
            color: #696969;
            height: 100%;
            margin: 0;
            padding: 0;
            background: #303030; /* Old browsers */
            /* IE9 SVG, needs conditional override of 'filter' to 'none' */
            background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzQ1NDg0ZCIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwMDAwMDAiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);
            background: -moz-linear-gradient(top,  #303030 0%, #121212 100%); /* FF3.6+ */
            background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#121212), color-stop(100%,#303030)); /* Chrome,Safari4+ */
            background: -webkit-linear-gradient(top,  #303030 0%,#121212 100%); /* Chrome10+,Safari5.1+ */
            background: -o-linear-gradient(top,  #303030 0%,#121212 100%); /* Opera 11.10+ */
            background: -ms-linear-gradient(top,  #303030 0%,#121212 100%); /* IE10+ */
            background: linear-gradient(to bottom,  #303030 0%,#121212 100%); /* W3C */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#303030', endColorstr='#121212',GradientType=0 ); /* IE6-8 */
            font-family: "Helvetica Neue Light", "HelveticaNeue-Light", "Helvetica Neue", Calibri, Helvetica, Arial, sans-serif;
            font-size: 15px;
        }

        body{
            height: auto;
            min-height: 100%;
        }

        a {
            opacity: 0.7;
            color: #f83e0c;
            text-decoration: none;
        }

        a:hover, a:visited, a:focus {
            opacity: 1;
            text-decoration: none;
        }

        .container {
            text-align: center;
            margin: 0 auto;
            padding: 15px;
            max-width: 650px;
        }

        .logo {
            width: 100%;
            max-width: 200px;
            margin-top: 50px;
            height: auto;
        }

        .nav{
            padding: 0;
            margin: 20px 0;
            list-style: none;
        }

        .nav.nav1 {
            background: #1B1B1B;
            padding: 8px 0;
        }

        .nav li{
            margin-bottom: 5px;
        }

        .nav li a {
            background: #2C2C2C;
            color: #C3C3C3;
            display: block;
            padding: 12px;
            /* webkit */
            -webkit-transition-property: background-color;
            -webkit-transition-duration: .6s;

            /* Firefox */
            -moz-transition-property: background-color;
            -moz-transition-duration: .6s;

            /* Standards */
            transition-property: background-color;
            transition-duration: .6s;
        }

        .nav li a:hover {
            background: #f83e0c;
            color: white;
        }

        .nav.nav1 li{
            width: 48%;
            box-sizing: border-box;
            display: inline-block;
            padding-left: 0px;
            padding-right: 2.5px;
        }

        .nav.nav1 li:nth-child(2n){
            padding-left: 2.5px;
            padding-right: 0px;
        }

        .nav.nav2 li{
            background: #1A1A1A;
            padding: 10px;
            text-align: left;
        }

        .nav.nav2 li a {
            margin-bottom: 10px;
        }

        .teaser{
            text-align: justify;
            margin-bottom: 40px;
            padding: 8px 8px 30px;
            border-bottom: 1px solid #333;
        }

        .copyrights{
            float: left;
            padding: 20px;
        }

        @media screen and ( max-width:480px ){
            .nav.nav1 li{
                width: 100%;
                padding: 0!important;
            }
            .nav.nav1 {
                padding: 8px!important;
            }
        }

    </style>
</head>
<body>

<div class="container">

    <a href="http://wp-customerarea.com" title="Visit http://wp-customerarea.com" target="_BLANK" style="opacity: 1;">
        <img class="logo" src="logo.png" alt="WP Customer Area logo" width="386" height="400"/>
    </a>

    <ul class="nav nav1">
        <li><a href="https://github.com/Varying-Vagrant-Vagrants/VVV" target="_BLANK">VVV Repository</a></li>
        <li><a href="http://local.wordpress.test/vendor/other/framework/theme/dashboard.html" target="_BLANK" style="margin:0;">WPCA Framework</a></li>
        <li><a href="https://bitbucket.org/wp-customerarea" target="_BLANK">WPCA Bitbucket</a></li>
        <li><a href="https://github.com/marvinlabs/customer-area" target="_BLANK">WPCA Github</a></li>
        <li><a href="http://vvv.test/database-admin" target="_BLANK">PHPmyAdmin</a></li>
        <li><a href="http://vvv.test/memcached-admin" target="_BLANK">phpMemcachedAdmin</a></li>
        <li><a href="http://vvv.test/opcache-status/opcache.php" target="_BLANK">Opcache Status</a></li>
        <li><a href="http://vvv.test/webgrind" target="_BLANK">Webgrind</a></li>
        <li><a href="http://vvv.test/phpinfo" target="_BLANK">PHP Info</a></li>
        <li><a href="http://vvv.test/dbreplace" target="_BLANK">DB Replace</a></li>
        <li><a href="http://vvv.test:1080" target="_BLANK">Mail Catcher</a></li>
    </ul>

    <ul class="nav nav2">

        <li>
            <a href="http://local.wordpress.test/" target="_BLANK">WordPress Stable</a>
            <ul>
                <li>LOCAL PATH: vagrant-local/www/wordpress-default</li>
                <li>VM PATH: /srv/www/wordpress-default</li>
                <li>URL: http://local.wordpress.test</li>
                <li>DB Name: wordpress_default</li>
            </ul>
        </li>
        <li>
            <a href="http://local.wordpress-trunk.test/" target="_BLANK">WordPress Trunk</a>
            <ul>
                <li>LOCAL PATH: vagrant-local/www/wordpress-trunk</li>
                <li>VM PATH: /srv/www/wordpress-trunk</li>
                <li>URL: http://local.wordpress-trunk.test</li>
                <li>DB Name: wordpress_trunk</li>
            </ul>
        </li>
        <li>
            <a href="http://build.wordpress-develop.test" target="_BLANK">WordPress Develop</a>
            <ul>
                <li>LOCAL PATH: vagrant-local/www/wordpress-develop</li>
                <li>VM PATH: /srv/www/wordpress-develop</li>
                <li>/src URL: http://src.wordpress-develop.test</li>
                <li>/build URL: http://build.wordpress-develop.test</li>
                <li>DB Name: wordpress_develop</li>
                <li>DB Name: wordpress_unit_tests</li>
            </ul>
        </li>
    </ul>

    <div style="clear:both;"></div>


    <p class="teaser"><strong>@TODO:</strong><br>- Include specific docs, or licencing.</p>

    <p class="copyrights">All Rights Reserved - http://www.marvinlabs.com</p>

</div>


</body>
</html>