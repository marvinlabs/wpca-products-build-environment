module.exports = function (grunt, options) {
    var extend = require('extend');

    // The options that are common to all plugins
    var baseOptions = function (opt) {
        return {
            options: {
                mangle: true,
                sourceMap: true,
                sourceMapName: opt.sourceMapName,
                sourceMapRoot: '/' + opt.sourceMapRoot
            }
        }
    };
    var targets = {};
    var addons = options.addons;

    addons.push(
        {
            slug: "customer-area",
            path: options.paths.base_plugin
        }
    );

    addons.forEach(function (addon) {
        var adminAsset = addon.path + "/assets/admin/js/" + addon.slug + ".min.js";
        var frontendAsset = addon.path + "/assets/frontend/js/" + addon.slug + ".min.js";

        var files = {};
        files[frontendAsset] = [
            addon.path + '/src/js/common/**/*.js',
            addon.path + '/src/js/frontend/**/*.js'
        ];

        targets[addon.slug + '-frontend'] = extend(true, {}, baseOptions(
                {
                    sourceMapName: addon.path + "/assets/frontend/js/" + addon.slug + ".js.map",
                    sourceMapRoot: addon.path + "/src/js/frontend/"
                }),
            {
                files: files
            }
        );

        files = {};
        files[adminAsset] = [
            addon.path + '/src/js/common/**/*.js',
            addon.path + '/src/js/admin/**/*.js'
        ];

        targets[addon.slug + '-admin'] = extend(true, {}, baseOptions(
                {
                    sourceMapName: addon.path + "/assets/admin/js/" + addon.slug + ".js.map",
                    sourceMapRoot: addon.path + "/src/js/admin/"
                }),
            {
                files: files
            }
        );
    });

    targets["libs-assets"] = extend(true, {}, {}, options.assets.cuarUglify);

    targets["cuarMasterSkin"] = extend(true, {}, baseOptions(
        {
            sourceMapName: options.paths.base_plugin + "/skins/frontend/master/assets/js/main.js.map",
            sourceMapRoot: options.paths.base_plugin + "/skins/frontend/master/assets/js/"
        }),
        {
            files: options.assets.cuarMasterSkin.files
        }
    );

    return targets;
};