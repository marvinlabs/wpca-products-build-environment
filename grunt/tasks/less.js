module.exports = function (grunt, options) {
    var extend = require('extend');

    // The options that are common to all plugins
    var baseOptions = function (opt) {
        return {
            "options": {
                "compress": true,
                "yuicompress": true,
                "optimization": 2,
                "sourceMap": true,
                "sourceMapFilename": opt.sourceMapFilename,
                "sourceMapURL": opt.sourceMapURL,
                "sourceMapBasepath": opt.sourceMapBasepath,
                "sourceMapRootpath": "/"
            }
        }
    };

    var targets = {};

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
                lessFilesList.push({
                    name: name,
                    abspath: abspath,
                    rootdir: rootdir,
                    subdir: subdir,
                    filename: filename
                });
            }
        });

        // Create options for all registered LESS files
        for (var i = 0; i < lessFilesList.length; i++) {
            var skinFiles = {};
            skinFiles[skin.plugin + "/skins/" + skin.path + "/assets/css/" + lessFilesList[i].name + ".min.css"] = [
                lessFilesList[i].abspath
            ];

            var targetName = "cuar-skin-" + skin.slug + "-" + lessFilesList[i].name;
            grunt.log.debug(targetName);

            targets[targetName] = extend(true, {}, baseOptions(
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

        var files = {};
        files[frontendAsset] = [
            addon.path + '/src/less/common/*.less',
            addon.path + '/src/less/frontend/*.less'
        ];
        targets[addon.slug + "-frontend"] = extend(true, {}, baseOptions(
            {
                "sourceMapFilename": addon.path + "/assets/frontend/css/" + addon.slug + ".css.map",
                "sourceMapURL": "/" + addon.path + "/assets/frontend/css/" + addon.slug + ".css.map",
                "sourceMapBasepath": "/"
            }
        ), {
            files: files
        });

        files = {};
        files[adminAsset] = [
            addon.path + '/src/less/common/*.less',
            addon.path + '/src/less/admin/*.less'
        ];
        targets[addon.slug + "-admin"] = extend(true, {}, baseOptions(
            {
                "sourceMapFilename": addon.path + "/assets/admin/css/" + addon.slug + ".css.map",
                "sourceMapURL": addon.slug + ".css.map",
                "sourceMapBasepath": addon.slug + "/src/less"
            }
        ), {
            files: files
        });
    });

    var themes = options.themes;
    themes.forEach(function (theme) {

        // Paths to less and css files
        var lessFilesFolder = theme.path + "/dev/src/less";
        var cssOutputFolder = theme.path + "/assets";

        if(!grunt.file.exists(lessFilesFolder)) {return;}

        // Each skin can contain multiple less files to compile
        // Dynamically read LESS source folder and store paths
        // Less files names must be : _{myFile}.less
        var lessFilesList = [];
        grunt.file.recurse(lessFilesFolder, function (abspath, rootdir, subdir, filename) {
            if ((abspath === rootdir + "/" + subdir + "/" + filename) && filename.match(/^_[0-9a-zA-Z\-_]*\.less$/g)) {
                var name = filename.substring(0, filename.lastIndexOf('.')).slice(1).replace('_','');
                lessFilesList.push({
                    name: name,
                    abspath: abspath,
                    rootdir: rootdir,
                    subdir: subdir,
                    filename: filename
                });
            }
        });

        // Create options for all registered LESS files
        for (var i = 0; i < lessFilesList.length; i++) {
            var skinFiles = {};
            skinFiles[cssOutputFolder + "/" + lessFilesList[i].subdir + "/css/" + lessFilesList[i].name + ".css"] = [
                lessFilesList[i].abspath
            ];

            var targetName = "cuar-theme-" + theme.slug + "-" + lessFilesList[i].subdir + "-" + lessFilesList[i].name;

            targets[targetName] = extend(true, {}, baseOptions(
                {
                    "sourceMapFilename": cssOutputFolder + "/" + lessFilesList[i].subdir + "/css/" + lessFilesList[i].name + '.css.map',
                    "sourceMapURL": "/" + cssOutputFolder + "/" + lessFilesList[i].subdir + "/css/" + lessFilesList[i].name + ".css.map",
                    "sourceMapBasepath": "/"
                }
            ), {
                files: skinFiles
            });
        }
    });

    return targets;
};