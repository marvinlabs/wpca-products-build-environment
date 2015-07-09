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
    grunt.registerTask("prepare-assets", function () {
        delete grunt.config.data.uglify["libs-assets"];
        grunt.task.run(["less", "uglify"]);
    });
    grunt.registerTask("prepare-archives", ["prepare-languages", "prepare-assets", "compress"]);

    grunt.registerTask("update-libs", [

        // Update bower libs
        // "exec:bower-update",

        // Update WPCA bootstrap fork
        // "prepare-vendors",

        // Update composer libs
        // "exec:composer-update",

        // Clean framework
        "clean:clean-framework-src-js",
        "clean:clean-framework-libs-js",
        "clean:clean-framework-libs-fonts",
        "clean:clean-framework-libs-imgs",

        // Update framework
        "copy:copy-framework-src-js",
        "copy:copy-framework-libs-js",
        "copy:copy-framework-libs-fonts",
        "copy:copy-framework-libs-imgs",

        // Rebuild some src JS files from vendors (bootstrap actually)
        "uglify:libs-assets",

        // Recompile main plugin assets
        "uglify:customer-area",
        "less:cuar-skin-frontend-master"
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