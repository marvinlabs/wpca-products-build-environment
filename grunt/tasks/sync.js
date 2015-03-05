module.exports = function (grunt, options) {
    var extend = require('extend');

    // The options that are common to all plugins
    var baseOptions = {
        verbose: true,
        updateAndDelete: true,
        ignoreInDest: ["**/.svn", "akismet"],
        verbose: true
    };

    var targets = {};

    // Add the new target for the main plugin
    var syncTargets = options.sync.sync_dests;
    var pluginFiles = [];
    var addons = options.addons;
    syncTargets.forEach(function (t) {
        var sources = [
            'customer-area', 'customer-area/**/*',
            'advanced-custom-fields', 'advanced-custom-fields/**/*',
            '!**/.git/**', '!**/.po'
        ];
        addons.forEach(function (addon) {
            sources.push(addon.slug);
            sources.push(addon.slug + '/**/*');
        });

        pluginFiles.push({
            cwd: options.paths.plugins,
            expand: true,
            src: sources,
            dest: t
        });
    });

    targets["wp-plugins"] = extend(true, {}, baseOptions, {
        files: pluginFiles
    });

    return targets;
};