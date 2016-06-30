module.exports = function (grunt, options) {
    var extend = require('extend');

    // The options that are common to all plugins
    var baseOptions = function (opt) {
        return {
            options: {
                mangle: true,
                sourceMap: true,
                sourceMapName: opt.sourceMapName,
                sourceMapRoot: '/' + opt.sourceMapRoot
            }
        }
    };
    var targets = {};
    var addons = options.addons;
    var themes = options.themes;

    addons.push(
        {
            slug: "customer-area",
            path: options.paths.base_plugin
        }
    );

    addons.forEach(function (addon) {
        var adminAsset = addon.path + "/assets/admin/js/" + addon.slug + ".min.js";
        var frontendAsset = addon.path + "/assets/frontend/js/" + addon.slug + ".min.js";

        var files = {};
        files[frontendAsset] = [
            addon.path + '/src/js/common/**/*.js',
            addon.path + '/src/js/frontend/**/*.js'
        ];

        targets[addon.slug + '-frontend'] = extend(true, {}, baseOptions(
                {
                    sourceMapName: addon.path + "/assets/frontend/js/" + addon.slug + ".js.map",
                    sourceMapRoot: addon.path + "/src/js/frontend/"
                }),
            {
                files: files
            }
        );

        files = {};
        files[adminAsset] = [
            addon.path + '/src/js/common/**/*.js',
            addon.path + '/src/js/admin/**/*.js'
        ];

        targets[addon.slug + '-admin'] = extend(true, {}, baseOptions(
                {
                    sourceMapName: addon.path + "/assets/admin/js/" + addon.slug + ".js.map",
                    sourceMapRoot: addon.path + "/src/js/admin/"
                }),
            {
                files: files
            }
        );
    });

    themes.forEach(function (theme) {
        var backendAsset = theme.path + "/assets/backend/js/" + theme.slug + ".js";
        var frontendAsset = theme.path + "/assets/frontend/js/" + theme.slug + ".js";

        var files = {};
        files[frontendAsset] = [
            theme.path + '/dev/src/js/common/**/*.js',
            theme.path + '/dev/src/js/frontend/**/*.js'
        ];

        targets['cuar-theme-' + theme.slug + '-frontend'] = extend(true, {}, baseOptions(
            {
                sourceMapName: theme.path + "/assets/frontend/js/" + theme.slug + ".js.map",
                sourceMapRoot: theme.path + "/dev/src/js/frontend/"
            }),
            {
                files: files
            }
        );

        files = {};
        files[backendAsset] = [
            theme.path + '/dev/src/js/common/**/*.js',
            theme.path + '/dev/src/js/backend/**/*.js'
        ];

        targets['cuar-theme-' + theme.slug + '-backend'] = extend(true, {}, baseOptions(
            {
                sourceMapName: theme.path + "/assets/backend/js/" + theme.slug + ".js.map",
                sourceMapRoot: theme.path + "/dev/src/js/backend/"
            }),
            {
                files: files
            }
        );

        // Custom JS files compiler
        var customJsFilesFolder = theme.path + '/dev/src/js/custom',
            jsFilesList = [],
            customFile = [];

        if(grunt.file.exists(customJsFilesFolder)) {

            // Each skin can contain multiple less files to compile
            // Dynamically read JS source folder and store paths
            // JS files names must be : _{myFile}.js
            grunt.file.recurse(customJsFilesFolder, function (abspath, rootdir, subdir, filename) {
                if (filename.match(/^_[0-9a-zA-Z\-_.]*\.js$/g)) {
                    var name = filename.substring(0, filename.lastIndexOf('.')).slice(1).replace('_', '');
                    jsFilesList.push({
                        name: name,
                        abspath: abspath,
                        rootdir: rootdir,
                        subdir: subdir,
                        filename: filename
                    });
                }
            });

            // Create options for all registered JS files
            for (var i = 0; i < jsFilesList.length; i++) {

                customFile = [];
                customFile['explodedName'] = jsFilesList[i].name.split('.');
                customFile['name'] = customFile['explodedName'].slice(-1)[0];
                customFile['toPath'] = customFile['explodedName'].join('/');
                
                files = {};
                files[theme.path + '/' + customFile['toPath'] + '.min.js'] = [
                    jsFilesList[i].abspath
                ];

                targets['cuar-theme-' + theme.slug + '-custom-' + customFile['name']] = extend(true, {}, baseOptions(
                    {
                        sourceMapName: theme.path + '/' + customFile['toPath'] + ".js.map",
                        sourceMapRoot: theme.path + '/dev/src/js/custom/'
                    }),
                    {
                        files: files
                    }
                );
            }
        }
    });

    targets["libs-assets"] = extend(true, {}, {}, options.assets.cuarUglify);

    targets["cuarMasterSkin"] = extend(true, {}, baseOptions(
        {
            sourceMapName: options.paths.base_plugin + "/skins/frontend/master/assets/js/main.js.map",
            sourceMapRoot: options.paths.base_plugin + "/skins/frontend/master/assets/js/"
        }),
        {
            files: options.assets.cuarMasterSkin.files
        }
    );

    return targets;
};