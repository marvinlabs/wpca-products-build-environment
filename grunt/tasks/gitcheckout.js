module.exports = function (grunt, options) {
    var extend = require('extend');

    var targets = {};

    var addons = options.addons.slice(0);

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
                branch: 'develop',
                create: true
            }
        };
    });

    return targets;
};