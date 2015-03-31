module.exports = function (grunt, options) {
    var rgx = /(\.)([^\d]\w[^\s"\.:]*)([\(,\s;:\.])/g;
    var tildeRgx = /\.col-/g;
    var prefix = 'cuar-';
    var exclusions = ['Microsoft'];

    return {
        'copy-bootstrap': {
            cwd: 'vendor/bower/',
            expand: true,
            src: ['bootstrap/*', 'bootstrap/**/*', '!bootstrap/**/*.less', '!bootstrap/**/*.css'],
            dest: 'vendor/wpca'
        },
        'prefix-bootstrap': {
            cwd: 'vendor/bower/',
            expand: true,
            src: ['bootstrap/**/*.less', 'bootstrap/**/*.css'],
            dest: 'vendor/wpca',
            options: {
                process: function (content, srcpath) {
                    content = content.replace(rgx, "$1" + prefix + "$2$3");
                    content = content.replace(tildeRgx, "." + prefix + "col-");
                    exclusions.forEach(function(str) {
                       content = content.replace(prefix+str, str);
                    });
                    return content;
                }
            },
        }
    };
};