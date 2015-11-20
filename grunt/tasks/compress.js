module.exports = function (grunt, options) {
    var extend = require('extend');

    // The options that are common to all plugins
    var baseOptions = {
        options: {
            mode: 'zip'
        }
    };

    var targets = {};

    // Create the targets for the base plugin and all add-ons
    var pkg = grunt.file.readJSON(options.paths.base_plugin + "/composer.json");
    targets["customer-area"] = extend(true, {}, baseOptions, {
        options: {
            archive: "releases/" + pkg.extra.slug + '-' + pkg.version + ".zip"
        },
        files: [{
            expand: true,
            cwd: options.paths.base_plugin,
            src: options.build.includeFiles,
            dest: pkg.extra.slug
        }]
    });

    var addons = options.addons;
    addons.forEach(function (addon) {
        targets[addon.slug] = extend(true, {}, baseOptions, {
            options: {
                archive: "releases/" + addon.productSlug + '-' + addon.version + ".zip"
            },
            files: [{
                expand: true,
                cwd: addon.path,
                src: options.build.includeFiles,
                dest: addon.slug
            }]
        });
    });

    return targets;
};