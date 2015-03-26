module.exports = function (grunt, options) {
    var extend = require('extend');

    // The options that are common to all plugins
    var baseOptions = function (opt) {
        return {
            options: {
                sourceMap: true,
                sourceMapName: opt.sourceMapName,
                sourceMapRoot: opt.sourceMapRoot
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
        files[adminAsset] = [
            addon.path + '/src/js/common/**/*.js',
            addon.path + '/src/js/admin/**/*.js'
        ];
        files[frontendAsset] = [
            addon.path + '/src/js/common/**/*.js',
            addon.path + '/src/js/frontend/**/*.js'
        ];

        targets[addon.slug] = extend(true, {}, baseOptions(
                {
                    sourceMapName: addon.path + "/assets/frontend/js/" + addon.slug + ".js.map",
                    sourceMapRoot: addon.path + "/src/js/"
                }),
            {
                files: files
            }
        );
    });

    return targets;
};