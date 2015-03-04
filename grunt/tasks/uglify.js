module.exports = function (grunt, options) {
    var extend = require('extend');

    // The options that are common to all plugins
    var baseOptions = {
        options: {
            sourceMap: false
            //sourceMap: true,
            //sourceMapFilename: config.sourcemap.path + "/" + config.sourcemap.name + ".js.map",
            //sourceMapURL: config.sourcemap.relativeUrl + "/" + config.sourcemap.name + ".js.map",
            //sourceMapBasepath: config.sourcemap.basePath,
            //sourceMapRootpath: config.sourcemap.rootPath
        },
        files: {}
    };

    var targets = {};

    // Create the targets for the base plugin and all add-ons
    var adminAsset = options.paths.base_plugin + "/assets/admin/js/customer-area.min.js";
    var frontendAsset = options.paths.base_plugin + "/assets/frontend/js/customer-area.min.js";

    var files = {};
    files[adminAsset] = [
        options.paths.base_plugin + '/src/js/common/**/*.js',
        options.paths.base_plugin + '/src/js/admin/**/*.js'
    ];
    files[frontendAsset] = [
        options.paths.base_plugin + '/src/js/common/**/*.js',
        options.paths.base_plugin + '/src/js/frontend/**/*.js'
    ];

    targets["customer-area"] = extend(true, {}, baseOptions, {
        files: files
    });

    var addons = options.addons;
    addons.forEach(function (addon) {
        var adminAsset = addon.path + "/assets/admin/js/" + addon.slug + ".min.js";
        var frontendAsset = addon.path + "/assets/frontend/js/" + addon.slug + ".min.js";

        var files = {};
        files[adminAsset] = [
            addon.path + '/src/js/common/**/*.js',
            addon.path + '/src/js/admin/**/*.js'
        ];
        files[frontendAsset] = [
            addon.path + '/src/js/common/**/*.js',
            addon.path + '/src/js/frontend/**/*.js'
        ];

        targets[addon.slug] = extend(true, {}, baseOptions, {
            files: files
        });
    });

    return targets;
};