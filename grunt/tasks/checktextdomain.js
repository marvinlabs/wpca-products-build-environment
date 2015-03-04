module.exports = function (grunt, options) {
    var extend = require('extend');
    var wpca = require('grunt-wpca/lib/wpca');

    // The options that are common to all plugins
    var baseOptions = {
        options: {
            correct_domain: true,
            keywords: options.i18n.keywords
        }
    };

    var targets = {};

    // Create the targets for the base plugin and all add-ons
    targets["customer-area"] = extend(true, {}, baseOptions, {
        options: {
            text_domain: "cuar"
        },
        files: [{
            src: [
                options.paths.base_plugin + '/customer-area.php',
                options.paths.base_plugin + "/src/php/**/*.php",
                options.paths.base_plugin + "/includes/**/*.php"
            ],
            expand: true
        }]
    });

    var addons = wpca.listAddons(options.paths.plugins, options.paths.addons_patterns);
    addons.forEach(function (addon) {
        targets[addon.slug] = extend(true, {}, baseOptions, {
            options: {
                text_domain: addon.textDomain
            },
            files: [{
                src: [
                    addon.path + '/' + addon.mainFile,
                    addon.path + "/src/php/**/*.php",
                    addon.path + "/includes/**/*.php"
                ],
                expand: true
            }]
        });
    });

    return targets;
};