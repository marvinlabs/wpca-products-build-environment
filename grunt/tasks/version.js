module.exports = function (grunt, options) {
    var extend = require('extend');

    // The options that are common to all plugins
    var baseOptions = {
        options: {
        }
    };

    var addons = options.addons.slice(0);

    var baseTargets = options.release.base_targets;
    var targets = {};

    // Create the targets for the base plugin and all add-ons
    baseTargets.forEach(function(baseTarget) {
        // Replace some placeholders in the base target source files
        var newSrc = [];
        baseTarget.src.forEach(function(s) {
           newSrc.push(s
               .replace('%%mainFile%%', 'customer-area.php')
               .replace('%%path%%', options.paths.base_plugin));
        });

        // Add the new target for the main plugin
        targets["customer-area" + '_' + baseTarget.id] = extend(true, {}, baseTarget, {
            options: {
                pkg: options.paths.base_plugin + '/composer.json'
            },
            src: newSrc
        });

        // Add a target for each add-on
        addons.forEach(function (addon) {
            newSrc = [];
            baseTarget.src.forEach(function(s) {
                newSrc.push(s
                    .replace('%%mainFile%%', addon.mainFile)
                    .replace('%%path%%', addon.path));
            });

            targets[addon.slug+ '_' + baseTarget.id] = extend(true, {}, baseTarget, {
                options: {
                    pkg: addon.path + '/composer.json'
                },
                src: newSrc
            });
        });
    });


    return targets;
};