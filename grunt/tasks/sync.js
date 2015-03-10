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
    var pluginSyncTargets = options.sync.sync_dests.plugins;
    var pluginFiles = [];
    var addons = options.addons;
    pluginSyncTargets.forEach(function (t) {
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

    // Add the new targets for the themes
    var themeSyncTargets = options.sync.sync_dests.themes;
    var themeFiles = [];
    var themes = options.themes;
    themeSyncTargets.forEach(function (t) {
        var sources = [
            "twenty*", "twenty*/**/*",
            '!**/.git/**', '!**/.po'
        ];
        themes.forEach(function (theme) {
            sources.push(theme.slug);
            sources.push(theme.slug + '/**/*');
        });

        themeFiles.push({
            cwd: options.paths.themes,
            expand: true,
            src: sources,
            dest: t
        });
    });

    targets["wp-themes"] = extend(true, {}, baseOptions, {
        files: themeFiles
    });

    return targets;
};