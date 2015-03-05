<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Required software](#required-software)
- [First time setup](#first-time-setup)
- [Vagrant as local MAMP/WAMP/XAMP/EasyPHP/... replacement](#vagrant-as-local-mampwampxampeasyphp-replacement)
  - [Let's develop something](#lets-develop-something)
  - [Let's call it a day](#lets-call-it-a-day)
- [Grunt tasks](#grunt-tasks)
  - [Combined (aka. most useful) tasks available for all plugins](#combined-aka-most-useful-tasks-available-for-all-plugins)
    - [`grunt prepare-languages`](#grunt-prepare-languages)
    - [`grunt prepare-assets`](#grunt-prepare-assets)
    - [`grunt prepare-archives`](#grunt-prepare-archives)
    - [`grunt start-dev`](#grunt-start-dev)
  - [Tasks available for all plugins](#tasks-available-for-all-plugins)
    - [`grunt checktextdomain`](#grunt-checktextdomain)
    - [`grunt makepot`](#grunt-makepot)
    - [`grunt potomo`](#grunt-potomo)
    - [`grunt sync-cuar-commons`](#grunt-sync-cuar-commons)
    - [`grunt less`](#grunt-less)
    - [`grunt autoprefixer`](#grunt-autoprefixer)
    - [`grunt uglify`](#grunt-uglify)
    - [`grunt bump-version`](#grunt-bump-version)
    - [`grunt wp_readme_to_markdown`](#grunt-wp_readme_to_markdown)
    - [`grunt compress`](#grunt-compress)
    - [`grunt sync`](#grunt-sync)
    - [`grunt watch`](#grunt-watch)
  - [Tasks specific to the main WP Customer Area plugin](#tasks-specific-to-the-main-wp-customer-area-plugin)
    - [`grunt tx-push`](#grunt-tx-push)
    - [`grunt tx-pull`](#grunt-tx-pull)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Required software

- Install NPM and Grunt
- Install Vagrant (that requires Ruby 1.9.x too)
- Install xgettext ([Installer for Windows](http://mlocati.github.io/gettext-iconv-windows/))

## First time setup

- Checkout this build-environment repository to a folder (e.g. c:/wpca/)
- Run `npm install` in the build environment directory
- Checkout the Customer Area plugin to the wp-plugins folder from [its github repository](https://github.com/marvinlabs/customer-area/)

## Vagrant as local MAMP/WAMP/XAMP/EasyPHP/... replacement

This build environment makes use of Vagrant (and more specifically of 
[VVV](https://github.com/Varying-Vagrant-Vagrants/VVV)) to provide a web server contained in a virtual machine.

Please refer to the documentation of [VVV](https://github.com/Varying-Vagrant-Vagrants/VVV) to know how to install and 
start this virtual machine. Basically, all files for your webserver will be shared in the folder `vagrant/www`. 

*Hint: if you still want to use *AMP or any other local server, you can edit the `grunt/config/sync.json` file and
add your web server's plugins folder to that list*

### Let's develop something

When you want to start developing, run the `start-vagrant.bat` script which will:
  
- start the vagrant VM (the first time you do it can take a few minutes)
- Open the `vvv.dev` URL in your favorite browser so you can access the sites easily
- synchronize the plugin files
- watch for changes in the `wp-plugins` folder and sync those changes to the VM's webserver

### Let's call it a day

Once you are finished, just run the `stop-vagrant.bat` script to halt gracefully the VM.

## Grunt tasks

All grunt tasks shall be run in the build environment directory directly

### Combined (aka. most useful) tasks available for all plugins

#### `grunt prepare-languages`

When translations need a refresh.

Runs sequentially: `checktextdomain`, then `makepot`, then `potomo`

#### `grunt prepare-assets`

When asset sources have changed and we need to compile them  

Runs sequentially: `less`, then `autoprefixer`, then `uglify`

#### `grunt prepare-archives`

When you are ready to release a new version and want to build a zip file for publishing your add-on

Runs sequentially: `prepare-languages`, then `prepare-assets`, then `compress`

#### `grunt start-dev`

When you want to start working with your local web server

Runs sequentially: `sync`, then `watch`

### Tasks available for all plugins

#### `grunt checktextdomain`

Checks that all the source code uses the proper text domain in internationalization functions

#### `grunt makepot`

Create the POT files from the source code

#### `grunt potomo`

Compile all `.po` files to `.mo` files 

#### `grunt sync-cuar-commons`

Use this when you want to copy all files required by an add-on from the main plugin.

- Copies customer-area/libs/cuar/** to each addon's folder

#### `grunt less`

Compile the LESS source code into CSS stylesheets. 

LESS files are taken from:

- Base plugin skins' `src/less` folder and compiled to the skin's `assets/css` folder
- 3rd party add-ons' `src/less` and compiled to the add-on's `assets/css` folder

#### `grunt autoprefixer`

Remove/add prefixes for CSS properties. This is usually run as post-processing of the `less` task. This task is run on
the CSS assets of the base plugin skins as well as 3rd party add-ons' CSS assets.

#### `grunt uglify`

Combines and compresses Javascript files into a unique file. 

JS files are taken from each plugin's `src/js` folder and compiled to the plugin's `assets/admin/js` and/or 
`assets/frontend/js` folder

#### `grunt bump-version`

Update the version number for a given plugin. Usage: `grunt bump-version:plugin:mode`

Examples:

- `grunt bump-version:customer-area:minor`
- `grunt bump-version:customer-area-login-form:major`
- `grunt bump-version:customer-area-notifications:patch`

#### `grunt wp_readme_to_markdown`

Convert each `readme.txt` file to a `README.md` file more appropriate for git repositories 

#### `grunt compress`

Make a zip file of each plugin and place it in the releases folder. File inclusion/exclusion can be adjusted in the file
named `grunt/config/build.json`.

#### `grunt sync`

Synchronize the `wp-plugins` folder with the local web server (or Vagrant) folder
  
#### `grunt watch`

Watch for file changes in:

- the `wp-plugins` folder to start a synchronisation task with the local web server 

### Tasks specific to the main WP Customer Area plugin

#### `grunt tx-push`

Use this when you have finished developing something and need to update the translation repository for translators.

*Note: You need to create the .transifex file with your credentials to wp-translations.org before you can use this task*

- Run the `prepare-languages:customer-area` task
- Push POT file to wp-translations.org
 
#### `grunt tx-pull`  

Use this when translators have finished working and you need to update the PO/MO files in the plugin folder. 

*Note: You need to create the .transifex file with your credentials to wp-translations.org before you can use this task*

- Push latest PO files from wp-translations.org
- Compile PO files to MO files