module.exports = function (grunt, options) {
    var extend = require('extend');

    // The options that are common to all plugins
    var baseOptions = {
        options: {
            compress: true,
            yuicompress: true,
            optimization: 2,
            sourceMap: false
            //sourceMap: true,
            //sourceMapFilename: config.sourcemap.path + "/css/" + config.sourcemap.name + ".min.css.map",
            //sourceMapURL: config.sourcemap.relativeUrl + "/css/" + config.sourcemap.name + ".min.css.map",
            //sourceMapBasepath: config.sourcemap.basePath,
            //sourceMapRootpath: config.sourcemap.rootPath
        }
    };

    var targets = {};

    // Create the targets for the base plugin and all add-ons
    var skins = options.skins;
    skins.forEach(function(skin) {
        var output = options.paths.base_plugin + "/skins/" + skin.path + "/assets/css/styles.min.css";
        var input = [
            options.paths.base_plugin + "/skins/" + skin.path + "/src/less/*.less"
        ];

        var files = {};
        files[output] = input;

        targets["cuar-skin-" + skin.slug] = extend(true, {}, baseOptions, {
            files: files
        });
    });

    // Create assets for addons (official add-ons do not have any particular styling, this is bundled in the main
    // plugin skins
    var addons = options.addons;
    addons.forEach(function (addon) {
        var adminAsset = addon.path + "/assets/admin/css/" + addon.slug + ".min.css";
        var frontendAsset = addon.path + "/assets/frontend/css/" + addon.slug + ".min.css";

        var files = {};
        files[adminAsset] = [
            addon.path + '/src/less/common/*.less',
            addon.path + '/src/less/admin/*.less'
        ];
        files[frontendAsset] = [
            addon.path + '/src/less/common/*.less',
            addon.path + '/src/less/frontend/*.less'
        ];

        targets[addon.slug] = extend(true, {}, baseOptions, {
            files: files
        });
    });

    return targets;
};