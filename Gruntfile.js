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
                "sync-cuar-commons": "grunt-wpca"
            }
        }
    });

    // Register some default grunt tasks
    grunt.registerTask("default", ["watch"]);

    grunt.registerTask("prepare-vendors", ["copy:copy-bootstrap", "copy:prefix-bootstrap"]);
    grunt.registerTask("prepare-languages", ["checktextdomain", "makepot", "potomo"]);
    grunt.registerTask("prepare-assets", ["less", "postcss", "uglify", "copy:libs-assets-extras"]);
    grunt.registerTask("prepare-archives", ["compress"]);

    grunt.registerTask("update-libs", [

        // Update bower libs
        "exec:bower-update",

        // Update composer libs
        "exec:composer-update",

        // Clean libs bower folder,
        "clean:clean-bower-libs-js",

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

    grunt.registerTask("tx-push", ["checktextdomain:customer-area", "makepot:customer-area", "exec:txpush_s"]);
    grunt.registerTask("tx-pull", ["exec:txpull", "potomo:customer-area"]);

    grunt.registerTask("start-dev", ["watch"]);

    // The task to bump version number in various places
    grunt.registerTask("bump-version", "Change the version number of one or more plugins", function (pluginId, mode) {
        var baseTargets = configOptions.release.base_targets;
        baseTargets.forEach(function (baseTarget) {
            grunt.task.run('version:' + pluginId + '_' + baseTarget.id + ':' + mode);
        });
    });

    // Master-Skin Less vars parser
    grunt.registerTask("dev-vars", "Parse master-skin Less vars to get values into a JSON file", function () {
        var masterLessVars = grunt.file.read(path.join(configOptions.paths.base_plugin, 'skins/frontend/master/src/less/wpca/variables/colors-config.less'))
                + grunt.file.read(path.join(configOptions.paths.base_plugin, 'skins/frontend/master/src/less/wpca/variables/colors.less'))
                + grunt.file.read(path.join(configOptions.paths.base_plugin, 'skins/frontend/master/src/less/wpca/variables/colors-google.less'))
                + grunt.file.read(path.join(configOptions.paths.base_plugin, 'skins/frontend/master/src/less/core/theme_variables.less')),
            lines = masterLessVars.split('\n'),
            lessVars = {},
            keyVar;
        lines.forEach(function (line) {
            if (line.indexOf('@') == 0) {
                keyVar = line.split(';')[0].split(':');
                lessVars[keyVar[0].replace(/@/g, '.cuar-dev-nuance-')] = keyVar[1].trim() + ";";
            }
        });
        grunt.file.write(path.join(configOptions.paths.base_plugin, 'skins/frontend/master/src/less/less-vars.css'), JSON.stringify(lessVars).replace('{', '&{').replace(/\\"/g, "").replace(/"([^"]*)":"([^;]*);",?/g, "$1 {&:before{content: '$2';} background: $2; &:after{content: '$1';}}").replace(/&:after\{content: '\.cuar-dev-nuance-([^']*)';}/g, "&:after{content: '@$1';}"));
    });
    grunt.registerTask("dev-master", [
        "dev-vars",
        "less:cuar-skin-frontend-master-styles",
        "less:cuar-skin-frontend-master-less-vars",
        "less:cuar-skin-frontend-master-dark-styles",
        "uglify:libs-assets"
    ]);
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