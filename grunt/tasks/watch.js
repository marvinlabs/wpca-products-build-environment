module.exports = function (grunt, options) {
    var extend = require('extend');

    // The options that are common to all plugins
    var baseOptions = function (opt) {
        return {
            "options": {
                nospawn: true,
                livereload: true
            }
        };
    };

    var targets = {};

    // Create the targets for the base plugin and all add-ons
    var skins = options.skins;
    skins.forEach(function (skin) {
        var tasks = [
            "less:cuar-skin-" + skin.slug
        ];
        var files = [
            options.paths.base_plugin + "/skins/" + skin.path + "/src/**/*.less"
        ];

        targets["cuar-skin-" + skin.slug + "-css"] = extend(true, {}, baseOptions({}), {
            files: files,
            tasks: tasks
        });
    });

    // Create assets for addons (official add-ons do not have any particular styling, this is bundled in the main
    // plugin skins
    var addons = options.addons.slice(0);

    addons.push(
        {
            slug: "customer-area",
            path: options.paths.base_plugin
        }
    );

    addons.forEach(function (addon) {
        var tasks = [
            "less:" + addon.slug + "-frontend",
            "less:" + addon.slug + "-admin"
        ];
        var files = [
            addon.path + '/src/less/common/*.less',
            addon.path + '/src/less/admin/*.less',
            addon.path + '/src/less/frontend/*.less'
        ];

        targets[addon.slug + "-css"] = extend(true, {}, baseOptions({}), {
            files: files,
            tasks: tasks
        });
    });

    addons.forEach(function (addon) {
        var tasks = [
            "uglify:" + addon.slug + "-frontend",
            "uglify:" + addon.slug + "-admin"
        ];
        var files = [
            addon.path + '/src/js/common/**/*.js',
            addon.path + '/src/js/admin/**/*.js',
            addon.path + '/src/js/frontend/**/*.js'
        ];

        targets[addon.slug + "-js"] = extend(true, {}, baseOptions({}), {
            files: files,
            tasks: tasks
        });
    });

    return targets;
};