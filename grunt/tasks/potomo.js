module.exports = function (grunt, options) {
    var extend = require('extend');

    // The options that are common to all plugins
    var baseOptions = {
        options: {
            poDel: false // Set to true if you want to erase the .po
        }
    };

    var targets = {};

    // Create the targets for the base plugin and all add-ons
    targets["customer-area"] = extend(true, {}, baseOptions, {
        options: {},
        files: [{
            expand: true,
            src: ['*.po'],
            ext: '.mo',
            nonull: true,
            cwd: options.paths.base_plugin + '/languages',
            dest: options.paths.base_plugin + '/languages'
        }]
    });

    var addons = options.addons;
    addons.forEach(function (addon) {
        targets[addon.slug] = extend(true, {}, baseOptions, {
            options: {},
            files: [{
                expand: true,
                src: ['*.po'],
                ext: '.mo',
                nonull: true,
                cwd: addon.path + '/' + addon.langFolder,
                dest: addon.path + '/' + addon.langFolder
            }]
        });
    });

    return targets;
};