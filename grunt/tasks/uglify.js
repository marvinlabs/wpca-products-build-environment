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
    //targets["customer-area"] = extend(true, {}, baseOptions, {
    //    options: {
    //        text_domain: "cuar"
    //    },
    //    files: [{
    //        src: [
    //            options.paths.base_plugin + '/customer-area.php',
    //            options.paths.base_plugin + "/src/php/**/*.php",
    //            options.paths.base_plugin + "/includes/**/*.php"
    //        ],
    //        expand: true
    //    }]
    //});

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