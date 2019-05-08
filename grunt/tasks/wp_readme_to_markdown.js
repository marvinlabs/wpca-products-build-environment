module.exports = function (grunt, options) {
    var extend = require('extend');

    // The options that are common to all plugins
    var baseOptions = {
        options: {
            screenshot_url: "http://plugins.svn.wordpress.org/customer-area/assets/{screenshot}.jpg"
        }
    };

    var targets = {};

    // Create the targets for the base plugin and all add-ons
    var md = options.paths.base_plugin + "/README.MD";
    var txt = options.paths.base_plugin + "/readme.txt";

    var files = {};
    files[md] = txt;
    targets["customer-area"] = extend(true, {}, baseOptions, {
        files: files
    });

    var addons = options.addons.slice(0);

    addons.forEach(function (addon) {
        var md =  addon.path + "/README.MD";
        var txt = addon.path + "/readme.txt";

        var files = {};
        files[md] = txt;
        targets[addon.slug] = extend(true, {}, baseOptions, {
            files: files
        });
    });

    return targets;
};