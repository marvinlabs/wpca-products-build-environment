module.exports = function (grunt) {
    var path = require("path");
    var wpca = require('grunt-wpca/lib/wpca');


    // Load configuration
    var configOptions = loadConfigurationFiles(grunt, {
        config: {
            src: "grunt/tasks/*"
        },
        pkg: grunt.file.readJSON("package.json"),
        assets: grunt.file.readJSON("grunt/config/assets.json")
    }, "grunt/config");

    // Some additional handy configuration info
    configOptions['addons'] = wpca.listAddons(configOptions.paths.plugins, configOptions.paths.addons_patterns);
    configOptions['themes'] = wpca.listThemes(configOptions.paths.themes, configOptions.paths.themes_patterns);

    // Configure tasks
    require("load-grunt-config")(grunt, {
        configPath: path.join(process.cwd(), "grunt/tasks"),
        init: true,
        data: configOptions,
        jitGrunt: {
            staticMappings: {
                "makepot": "grunt-wp-i18n",
                "sync-cuar-commons": "grunt-wpca",
                "update-cuar-versions": "grunt-wpca",
                "gitfetch": "grunt-git",
                "gitpull": "grunt-git",
                "gitreset": "grunt-git"
            }
        }
    });

    // Register some default grunt tasks
    grunt.registerTask("default", ["watch"]);

    /**
     * Prepare Vendors
     *
     * @deprecated
     */
    // grunt.registerTask("prepare-vendors", ["copy:copy-bootstrap", "copy:prefix-bootstrap"]);

    /**
     * Update libraries
     */
    grunt.registerTask("update-libs", [

        // Update yarn libs
        "exec:yarn-update",

        // Update composer libs
        "exec:composer-update",

        // Clean libs yarn folder,
        "clean:clean-yarn-libs-js",

        // Clean framework folders
        "clean:clean-framework-src-js",
        "clean:clean-framework-libs-js",
        "clean:clean-framework-libs-fonts",
        "clean:clean-framework-libs-imgs",

        // Update libs from framework
        "copy:copy-framework-src-js",
        "copy:copy-framework-libs-js",
        "copy:copy-framework-libs-fonts",
        "copy:copy-framework-libs-imgs"

        // ------------------------------------------------------ //
        // Then you need to recompile main plugin assets using :  //
        // grunt prepare-assets                                   //
        // ------------------------------------------------------ //

    ]);

    /**
     * Prepare Languages
     * You should then run grunt tx-push, then translate the strings directly on Transifex, then run grunt tx-pull
     */
    grunt.registerTask("prepare-languages", ["checktextdomain", "makepot", "potomo" ]);
    grunt.registerTask("tx-push", ["checktextdomain:customer-area", "makepot:customer-area", "exec:txpush_s"]);
    grunt.registerTask("tx-pull", ["exec:txpull", "potomo:customer-area"]);

    /**
     * Prepare Assets
     */
    grunt.registerTask("prepare-assets", [
        //"gitpull:framework",
        "copy:libs-assets-extras",
        "prepare-dev-assets",
        "less",
        "postcss",
        "uglify",
        "wrap",
        "update-cuar-versions"
    ]);
    grunt.registerTask("prepare-dev-assets", function() {
        var tasks = [];
        configOptions.skins.forEach(function (skin) {
            if(!skin["slug"].match("^admin-") && skin["slug"].match("^frontend-")) {
                tasks.push("dev-vars:" + skin["slug"]);
                tasks.push("less:cuar-skin-" + skin["slug"] + "-less-vars");
            }
        });
        grunt.task.run(tasks);
    });

    /**
     * Prepare Archives
     */
    grunt.registerTask("prepare-archives", ["compress"]);

    /**
     * The task to bump version number in various places
     *
     * @param plugin ID
     * @param bump mode
     */
    grunt.registerTask("bump-version", "Change the version number of one or more plugins", function (pluginId, mode) {
        var baseTargets = configOptions.release.base_targets;
        baseTargets.forEach(function (baseTarget) {
            grunt.task.run('version:' + pluginId + '_' + baseTarget.id + ':' + mode);
        });
    });

    /**
     * A basic watch task
     *
     * You should prefer the dev-skin task instead.
     */
    grunt.registerTask("start-dev", ["watch"]);

    /**
     * Task for developing a skin
     *
     * This task is used to generate the styles for a selected skin.
     * Do not use it for compiling a skin before releasing, use grunt prepare-assets instead.
     *
     * @param skin string The skin theme beginning by frontend-
     */
    grunt.registerTask('dev-skin', function(skin) {
        if (typeof skin === 'undefined') { skin = "frontend-master"; }

        if(skin.match("^admin-")) {
            grunt.fail.fatal("This task is not ready for admin skins yet");
        }

        if(!skin.match("^frontend-")) {
            grunt.fail.fatal("You have to include 'frontend-' before the skin name");
        }

        if (skin === "frontend-master") {
            grunt.task.run([
                "copy:libs-assets-extras"
            ]);
        }

        grunt.task.run([
            "dev-vars:" + skin,
            "less:cuar-skin-" + skin + "-less-vars",
            "less:cuar-skin-" + skin + "-styles"
        ]);

        if (skin === "frontend-master") {
            grunt.task.run([
                "uglify:libs-assets",
                "uglify:cuarMasterSkin"
            ]);
        }
    });

    /**
     * Master-Skin Less vars parser
     *
     * This task will parse most of the Less variables used by the skin and generate a less-vars.css for the selected
     * skin and display a nuancier color palette while using WPCA plugin in build-env development mode
     *
     * @param skin string The skin theme beginning by frontend-
     */
    grunt.registerTask("dev-vars", "Parse skin Less vars to get values into a CSS file", function (skin) {

        if (typeof skin === 'undefined') {
            skin = "frontend-master";
        }

        if(skin.match("^admin-")) {
            grunt.fail.fatal("This task is not ready for admin skins yet");
        }

        if(!skin.match("^frontend-")) {
            grunt.fail.fatal("You have to include 'frontend-' before the skin name");
        }

        var skinConfCount = 0;
        var thisSkin = [];

        configOptions.skins.forEach(function (skinConf) {
            if (skinConf.slug === skin) {
                thisSkin['slug'] = configOptions.skins[skinConfCount].slug;
                thisSkin['plugin'] = configOptions.skins[skinConfCount].plugin;
                thisSkin['path'] = configOptions.skins[skinConfCount].path;
            }
            skinConfCount++;
        });

        var masterLessScheme = thisSkin['path'].indexOf('dark') !== -1 ? 'dark' : 'light';

        var masterLessVars = grunt.file.read(path.join(thisSkin['plugin'], 'skins/' + thisSkin['path'] + '/src/less/wpca/variables/colors-config.less'))
                + grunt.file.read(path.join(configOptions.paths.base_plugin, 'skins/frontend/master/src/less/wpca/variables/colors.less'))
                + grunt.file.read(path.join(configOptions.paths.base_plugin, 'skins/frontend/master/src/less/wpca/variables/colors-for-' + masterLessScheme + '-scheme.less'))
                + grunt.file.read(path.join(configOptions.paths.base_plugin, 'skins/frontend/master/src/less/wpca/variables/colors-google.less'))
                + grunt.file.read('vendor/other/framework/theme_wpca/assets/skin/core/theme_variables.less')
                + grunt.file.read(path.join(thisSkin['plugin'], 'skins/' + thisSkin['path'] + '/src/less/wpca/variables/overrides.less')),
            lines = masterLessVars.split('\n'),
            lessVars = {},
            keyVar;

        var j = 0;
        lines.forEach(function (line) {
            if (line.indexOf('@') === 0 && line.charAt(1) !== '{') {
                keyVar = line.split(';')[0].split(':');
                if (keyVar.length > 0) {
                    lessVars[keyVar[0].replace(/@/g, '.cuar-dev-nuance-')] = keyVar[1].trim() + ";";
                    j++;
                }
            }
        });

        grunt.file.write(path.join(thisSkin['plugin'], 'skins/' + thisSkin['path'] + '/src/less/less-vars.css'), JSON.stringify(lessVars).replace('{', '&{').replace(/\\"/g, "").replace(/"([^"]*)":"([^;]*);",?/g, "$1 {&:before{content: '$2';} background: $2; &:after{content: '$1';}}").replace(/&:after\{content: '\.cuar-dev-nuance-([^']*)';}/g, "&:after{content: '@$1';}"));
    });
};

/**
 * Load configuration files and store them in an associative array
 * @param grunt The grunt object
 * @param config The configuration object
 * @param path The path where configuration JSON files are stored
 * @returns {{}}
 */
function loadConfigurationFiles(grunt, config, path) {
    var glob = require("glob");
    glob.sync("*.json", {cwd: path}).forEach(function (filename) {
        var key = filename.replace(/\.json$/, "");
        config[key] = grunt.file.readJSON(path + "/" + filename);
    });

    return config;
}