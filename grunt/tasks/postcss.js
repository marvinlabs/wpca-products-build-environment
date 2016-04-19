module.exports = function (grunt, options) {
    var extend = require('extend');

    // The options that are common to all plugins
    var targets = {
        options: {
            map: false,
            processors: [
                require('pixrem')(), // add fallbacks for rem units
                require('autoprefixer')({ // add vendor prefixes
                    browsers: ['last 3 versions', '> 2%'],
                    silent: true,
                    cascade: false // We have minified CSS...
                }),
                require('cssnano')() // minify the result
            ]
        }
    };


    // Create the targets for the base plugin and all add-ons
    var skins = options.skins;
    skins.forEach(function(skin) {
        var asset = options.paths.base_plugin + "/skins/" + skin.path + "/assets/css/styles.min.css";
        if (!grunt.file.exists(asset)) return;

        targets["cuar-skin-" + skin.slug] = {
            src: [ asset ]
        };
    });

    // Create the targets for the base plugin and all add-ons
    var skins = options.skins;
    skins.forEach(function (skin) {

        // Paths to less and css files
        var lessFilesFolder = skin.plugin + "/skins/" + skin.path + "/src/less";
        var cssOutputFolder = skin.plugin + "/skins/" + skin.path + "/assets/css";

        // Each skin can contain multiple less files to compile
        // Dynamically read LESS source folder and store paths
        // Less files names must be : _{myFile}.less
        var lessFilesList = [];
        grunt.file.recurse(lessFilesFolder, function (abspath, rootdir, subdir, filename) {
            if ((abspath === rootdir + "/" + filename) && filename.match(/^_[0-9a-zA-Z\-_]*\.less$/g)) {
                var name = filename.substring(0, filename.lastIndexOf('.')).slice(1).replace('_','');
                var asset = options.paths.base_plugin + "/skins/" + skin.path + "/assets/css/" + name + ".min.css";
                if (grunt.file.exists(asset)) {
                    targets["cuar-skin-" + skin.slug] = {
                        src: [asset]
                    };
                }
            }
        });

        // Create options for all registered LESS files
        for (var i = 0; i < lessFilesList.length; i++) {
            var skinFiles = {};
            skinFiles[skin.plugin + "/skins/" + skin.path + "/assets/css/" + lessFilesList[i].name + ".min.css"] = [
                lessFilesList[i].abspath
            ];
            targets["cuar-skin-" + skin.slug + "-" + lessFilesList[i].name] = extend(true, {}, baseOptions(
                {
                    "sourceMapFilename": cssOutputFolder + "/" + lessFilesList[i].name + '.css.map',
                    "sourceMapURL": "/"  + skin.plugin + "/skins/" + skin.path + "/assets/css/" + lessFilesList[i].name + ".css.map",
                    "sourceMapBasepath": "/"
                }
            ), {
                files: skinFiles
            });
        }
    });

    // Create assets for addons (official add-ons do not have any particular styling, this is bundled in the main
    // plugin skins
    var addons = options.addons;
    addons.forEach(function (addon) {
        var adminAsset = addon.path + "/assets/admin/css/" + addon.slug + ".min.css";
        var frontendAsset = addon.path + "/assets/frontend/css/" + addon.slug + ".min.css";
        var assets = [];
        if (grunt.file.exists(adminAsset)) assets.push(adminAsset);
        if (grunt.file.exists(frontendAsset)) assets.push(frontendAsset);

        // An add-on can contain skins
        var skinsFolders = ['frontend', 'admin'];
        skinsFolders.forEach(function (folder) {
            if (grunt.file.exists(addon.path + "/skins/" + folder)) {
                grunt.file.recurse(addon.path + "/skins/" + folder, function (abspath, rootdir, subdir, filename) {
                    if (subdir.substring(subdir.indexOf("/")) + "/" + filename === "/assets/css/styles.min.css") {
                        assets.push(abspath);
                    }
                })
            }
        });

        if (assets.length<=0) return;

        targets[addon.slug] = {
            src: assets
        };
    });

    return targets;
};