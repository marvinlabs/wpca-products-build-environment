module.exports = function (grunt, options) {
    var extend = require('extend');

    var processPot = function (pot) {
        pot.headers["report-msgid-bugs-to"] = options.pkg.bugs.url + "\n";
        pot.headers["last-translator"] = options.pkg.author.name + " <" + options.pkg.author.email + ">\n";
        pot.headers["language-team"] = options.pkg.author.url + "\n";
        pot.headers["language"] = "en_US";

        var excluded_meta = [
            "Plugin Name of the plugin/theme",
            "Plugin URI of the plugin/theme",
            "Author of the plugin/theme",
            "Author URI of the plugin/theme"
        ];
        for (var translation in pot.translations[""]) {
            if ("undefined" !== typeof pot.translations[""][translation].comments.extracted) {
                if (excluded_meta.indexOf(pot.translations[""][translation].comments.extracted) >= 0) {
                    console.log("Excluded meta: " + pot.translations[""][translation].comments.extracted);
                    delete pot.translations[""][translation];
                }
            }
        }
        return pot;
    };

    // The options that are common to all plugins
    var baseOptions = {
        options: {
            exclude: [
                "node_modules/.*",
                "libs/.*",
                "grunt/.*",
                "assets/.*"
            ],
            potComments: options.i18n.copyright,
            potHeaders: {
                poedit: true,
                "x-poedit-keywordslist": true
            },
            type: options.i18n.projectType,
            updateTimestamp: true,
            updatePoFiles: true
        }
    };

    var targets = {};

    // Create the targets for the base plugin and all add-ons
    targets["customer-area"] = extend(true, {}, baseOptions, {
        options: {
            cwd: options.paths.base_plugin,
            include: [
                "customer-area.php",
                "src/php/.*",
                "includes/.*"
            ],
            domainPath: "languages",
            mainFile: "customer-area.php",
            potFilename: "cuar.pot",
            processPot: processPot
        }
    });

    var addons = options.addons;
    addons.forEach(function (addon) {
        targets[addon.slug] = extend(true, {}, baseOptions, {
            options: {
                cwd: addon.path,
                include: [
                    addon.mainFile,
                    "src/php/.*",
                    "includes/.*"
                ],
                domainPath: addon.langFolder,
                mainFile: addon.mainFile,
                potFilename: addon.textDomain + ".pot",
                processPot: processPot
            }
        });
    });

    return targets;
};