## Required software

- Install NPM and Grunt
- Install Vagrant (that requires Ruby 1.9.x too)
- Install xgettext ([Installer for Windows](http://mlocati.github.io/gettext-iconv-windows/))

## First time setup

- Checkout this build-environment repository to a folder (e.g. c:/wpca/)
- Checkout the Customer Area plugin to the wp-plugins folder from [its github repository](https://github.com/marvinlabs/customer-area/)
- Run `npm install` in the build environment directory

## Grunt tasks

All grunt tasks shall be run in the build environment directory directly

### Combined (aka. most useful) tasks available for all plugins

#### `grunt prepare-languages`

Runs sequentially: `checktextdomain`, then `makepot`, then `potomo`

#### `grunt prepare-assets`

Runs sequentially: `less`, then `autoprefixer`, then `uglify`

#### `grunt prepare-archives`

Runs sequentially: `prepare-languages`, then `prepare-assets`, then `compress`

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

#### `grunt wp_readme_to_markdown`

Convert each `readme.txt` file to a `README.md` file more appropriate for git repositories 

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