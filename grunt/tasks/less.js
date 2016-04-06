module.exports = function (grunt, options) {
    var extend = require('extend');

    // The options that are common to all plugins
    var baseOptions = function (opt) {
        return {
            "options": {
                "compress": true,
                "yuicompress": true,
                "optimization": 2,
                "sourceMap": true,
                "sourceMapFilename": opt.sourceMapFilename,
                "sourceMapURL": opt.sourceMapURL,
                "sourceMapBasepath": opt.sourceMapBasepath,
                "sourceMapRootpath": "/"
            }
        }
    };

    var targets = {};

    // Create the targets for the base plugin and all add-ons
    var skins = options.skins;
    skins.forEach(function (skin) {
        var output = skin.plugin + "/skins/" + skin.path + "/assets/css/styles.min.css";
        var input = [
            skin.plugin + "/skins/" + skin.path + "/src/less/*.less"
        ];

        var files = {};
        files[output] = input;

        targets["cuar-skin-" + skin.slug] = extend(true, {}, baseOptions(
            {
                "sourceMapFilename": skin.plugin + "/skins/" + skin.path + "/assets/css/styles.css.map",
                "sourceMapURL": "/"  + skin.plugin + "/skins/" + skin.path + "/assets/css/styles.css.map",
                "sourceMapBasepath": "/"
            }
        ), {
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
        files[frontendAsset] = [
            addon.path + '/src/less/common/*.less',
            addon.path + '/src/less/frontend/*.less'
        ];
        targets[addon.slug + "-frontend"] = extend(true, {}, baseOptions(
            {
                "sourceMapFilename": addon.path + "/assets/frontend/css/" + addon.slug + ".css.map",
                "sourceMapURL": "/" + addon.path + "/assets/frontend/css/" + addon.slug + ".css.map",
                "sourceMapBasepath": "/"
            }
        ), {
            files: files
        });

        files = {};
        files[adminAsset] = [
            addon.path + '/src/less/common/*.less',
            addon.path + '/src/less/admin/*.less'
        ];
        targets[addon.slug + "-admin"] = extend(true, {}, baseOptions(
            {
                "sourceMapFilename": addon.path + "/assets/admin/css/" + addon.slug + ".css.map",
                "sourceMapURL": addon.slug + ".css.map",
                "sourceMapBasepath": addon.slug + "/src/less"
            }
        ), {
            files: files
        });
    });

    return targets;
};