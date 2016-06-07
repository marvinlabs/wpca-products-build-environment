module.exports = function (grunt, options) {
    var rgx = /(\.)([^\d]\w[^\s"\.:]*)([\(,\s;:\.])/g;
    var tildeRgx = /\.col-/g;
    var prefix = 'cuar-';
    var exclusions = ['Microsoft', 'css.map'];

    return {
        'copy-bootstrap': {
            cwd: 'wp-plugins/customer-area/vendor/bower/',
            expand: true,
            src: ['bootstrap/*', 'bootstrap/**/*', '!bootstrap/**/*.less', '!bootstrap/**/*.css'],
            dest: 'wp-plugins/customer-area/vendor/wpca'
        },
        'prefix-bootstrap': {
            cwd: 'wp-plugins/customer-area/vendor/bower/',
            expand: true,
            src: ['bootstrap/**/*.less', 'bootstrap/**/*.css'],
            dest: 'wp-plugins/customer-area/vendor/wpca',
            options: {
                process: function (content, srcpath) {
                    content = content.replace(rgx, "$1" + prefix + "$2$3");
                    content = content.replace(tildeRgx, "." + prefix + "col-");
                    exclusions.forEach(function (str) {
                        var find = prefix + str;
                        find = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
                        var re = new RegExp(find, 'g');
                        content = content.replace(re, str);
                    });
                    return content;
                }
            }
        },
        'copy-framework-src-js': {
            cwd: 'vendor/other/framework/theme/assets/js/utility',
            expand: true,
            src: options.assets.frameworkSrcJs,
            dest: 'wp-plugins/customer-area/src/js/frontend/framework'
        },
        'copy-framework-libs-js': {
            cwd: 'vendor/other/framework/theme/vendor/plugins',
            expand: true,
            src: options.assets.frameworkLibsJs,
            dest: 'wp-plugins/customer-area/libs/js/framework'
        },
        'copy-framework-libs-fonts': {
            cwd: 'vendor/other/framework/theme/assets/fonts',
            expand: true,
            src: options.assets.frameworkLibsFonts,
            dest: 'wp-plugins/customer-area/skins/frontend/master/assets/fonts/framework'
        },
        'copy-framework-libs-imgs': {
            cwd: 'vendor/other/framework/theme/assets/img',
            expand: true,
            src: options.assets.frameworkLibsImgs,
            dest: 'wp-plugins/customer-area/skins/frontend/master/assets/img/framework'
        },
        'libs-assets-extras': options.assets.cuarCopy
    };
};