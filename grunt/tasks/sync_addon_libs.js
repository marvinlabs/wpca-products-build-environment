module.exports = function (grunt, options) {
    return {
        options: {
            base_path: options.paths.plugins,
            addons_pattern: options.paths.addons_patterns
        },
        default: {
        }
    };
};