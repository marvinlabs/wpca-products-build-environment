module.exports = function (grunt, options) {
    var rgx = /(\.)([^\d]\w[^\s"\.:]*)([\(,\s;:\.])/g;
    var tildeRgx = /\.col-/g;
    var prefix = 'cuar-';
    var exclusions = ['Microsoft', 'css.map'];

    return {
        'copy-bootstrap': {
            cwd: 'vendor/bower/',
            expand: true,
            src: ['bootstrap/*', 'bootstrap/**/*', '!bootstrap/**/*.less', '!bootstrap/**/*.css'],
            dest: 'wp-plugins/customer-area/skins/vendor/wpca'
        },
        'prefix-bootstrap': {
            cwd: 'vendor/bower/',
            expand: true,
            src: ['bootstrap/**/*.less', 'bootstrap/**/*.css'],
            dest: 'wp-plugins/customer-area/skins/vendor/wpca',
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
            },
        }
    };
};