module.exports = function (grunt, options) {
    var extend = require('extend');

    var targets = {};

    var addons = options.addons;

    addons.push(
        {
            slug: "customer-area",
            path: options.paths.base_plugin
        }
    );

    addons.push(
        {
            slug: "framework",
            path: "vendor/other"
        }
    );

    addons.forEach(function (addon) {
        targets[addon.slug] = {
            options: {
                cwd: addon.path,
                all: true
            }
        };
    });

    return targets;
};