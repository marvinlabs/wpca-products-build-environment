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
    var addons = options.addons;
    addons.forEach(function (addon) {
        if (addon.langFolder === undefined) addon.langFolder = 'languages';
        
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