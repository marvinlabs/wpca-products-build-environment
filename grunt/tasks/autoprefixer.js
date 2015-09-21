module.exports = function (grunt, options) {
    var extend = require('extend');

    // The options that are common to all plugins
    var targets = {
        options: {
            browsers: ['last 3 versions', '> 2%'],
            silent: true,
            cascade: false // We have minified CSS...
        }
    };


    // Create the targets for the base plugin and all add-ons
    var skins = options.skins;
    skins.forEach(function(skin) {
        var asset = options.paths.base_plugin + "/skins/" + skin.path + "/assets/css/styles.min.css";
        if (!grunt.file.exists(asset)) return;

        targets["cuar-skin-" + skin.slug] = {
            src: [ asset ]
        };
    });

    // Create assets for addons (official add-ons do not have any particular styling, this is bundled in the main
    // plugin skins
    var addons = options.addons;
    addons.forEach(function (addon) {
        var adminAsset = addon.path + "/assets/admin/css/" + addon.slug + ".min.css";
        var frontendAsset = addon.path + "/assets/frontend/css/" + addon.slug + ".min.css";
        var assets = [];
        if (grunt.file.exists(adminAsset)) assets.push(adminAsset);
        if (grunt.file.exists(frontendAsset)) assets.push(frontendAsset);

        if (assets.length<=0) return;

        targets[addon.slug] = {
            src: assets
        };
    });

    return targets;
};