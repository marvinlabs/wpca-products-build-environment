module.exports = function (grunt, options) {
    var addons = options.addons;

    addons.push(
        {
            slug: "customer-area",
            path: options.paths.base_plugin
        }
    );
};