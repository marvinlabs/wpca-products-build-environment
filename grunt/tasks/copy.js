module.exports = function (grunt, options) {
    var rgx = /(\.)([^\d]\w[^\s"\.]*)([\(,\s;\.])/g;
    var tildeRgx = /\.col-/g;
    var prefix = 'cuar-';

    return {
        'copy-bootstrap': {
            cwd: 'vendor/bower/',
            expand: true,
            src: ['bootstrap/*', 'bootstrap/**/*', '!bootstrap/**/*.less'],
            dest: 'vendor/wpca'
        },
        'prefix-bootstrap': {
            cwd: 'vendor/bower/',
            expand: true,
            src: ['bootstrap/**/*.less'],
            dest: 'vendor/wpca',
            options: {
                process: function (content, srcpath) {
                    content = content.replace(rgx, "$1" + prefix + "$2$3");
                    content = content.replace(tildeRgx, "." + prefix + "col-");
                    return content;
                }
            },
        }
    };
};