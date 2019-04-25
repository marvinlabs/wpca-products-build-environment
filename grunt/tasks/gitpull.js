module.exports = function (grunt, options) {
    var extend = require('extend');

    var targets = {};

    var addons = options.addons.slice(0);

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

    addons.push(
        {
            slug: "customer-area-advanced-custom-fields-pro",
            path: options.paths.base_plugin
        }
    );

    addons.forEach(function (addon) {
        targets[addon.slug] = {
            options: {
                cwd: addon.path,
                all: true,
                remote: "origin",
                branch: "develop"
            }
        };
    });

    return targets;
};