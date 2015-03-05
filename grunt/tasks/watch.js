module.exports = function (grunt, options) {
    var extend = require('extend');

    // The options that are common to all plugins
    var baseOptions = {
        options: {
            nospawn: true
        }
    };

    var targets = {};

    // Watch the plugin files to synchronize automatically to vagrant
    targets["wp-plugins"] = extend(true, {}, baseOptions, {
        files: ['wp-plugins/**/*'],
        tasks: ['sync']
    });

    // TODO Watch LESS, JS, PHP

    return targets;
};