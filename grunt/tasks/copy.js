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
            src: [
                'admindock/admindock.js',
                'adminpanels/adminpanels.js',
                'bootbox/bootbox.js',
                'fullscreen/jquery.fullscreen.js',
                'helpers/helpers.js',
                'multiselect/bootstrap-multiselect.js',
                'nanoscroller/jquery.nanoscroller.js',
                'scroller/jquery.scroller.js',
                'underscore/underscore.min.js'
            ],
            dest: 'wp-plugins/customer-area/src/js/frontend/framework'
        },
        'copy-framework-libs-js': {
            cwd: 'vendor/other/framework/theme/vendor/',
            expand: true,
            src: [
                'jquery/*',
                'plugins/animate/*',
                'plugins/bstimeout/*',
                'plugins/bstour/*',
                'plugins/c3charts/*',
                'plugins/canvaslog/*',
                'plugins/circles/*',
                'plugins/ckeditor/*',
                'plugins/colorpicker/*',
                'plugins/countdown/*',
                'plugins/cropper/*',
                'plugins/datatables/*',
                'plugins/datepicker/*',
                'plugins/daterange/*',
                'plugins/dropzone/*',
                'plugins/duallistbox/*',
                'plugins/fancytree/*',
                'plugins/fileuploads/*',
                'plugins/flip/*',
                'plugins/footable/*',
                'plugins/fullcalendar/*',
                'plugins/globalize/*',
                'plugins/gmap/*',
                'plugins/highcharts/*',
                'plugins/highlight/*',
                'plugins/holder/*',
                'plugins/imagezoom/*',
                'plugins/jquery.spin/*',
                'plugins/jquerydial/*',
                'plugins/jqueryflot/*',
                'plugins/jquerymask/*',
                'plugins/jvectormap/*',
                'plugins/ladda/*',
                'plugins/lazyline/*',
                'plugins/magnific/*',
                'plugins/map/*',
                'plugins/mapplic/*',
                'plugins/markdown/*',
                'plugins/markitup/*',
                'plugins/maxlength/*',
                'plugins/mixitup/*',
                'plugins/moment/*',
                'plugins/nestable/*',
                'plugins/nprogress/*',
                'plugins/oggrid/*',
                'plugins/pnotify/*',
                'plugins/select2/*',
                'plugins/slick/*',
                'plugins/sparkline/*',
                'plugins/summernote/*',
                'plugins/tabdrop/*',
                'plugins/tagmanager/*',
                'plugins/tagsinput/*',
                'plugins/typeahead/*',
                'plugins/validate/*',
                'plugins/waypoints/*',
                'plugins/xeditable/*'
            ],
            dest: 'wp-plugins/customer-area/libs/js'
        },
        'copy-framework-libs-fonts': {
            cwd: 'vendor/other/framework/theme/assets/fonts',
            expand: true,
            src: [
                'fonts/admindesigns/*',
                'fonts/font-awesome/*',
                'fonts/glyphicons/*',
                'fonts/glyphicons-pro/*',
                'fonts/icomoon/*',
                'fonts/iconsweets/*',
                'fonts/octicons/*',
                'fonts/open-sans/*',
                'fonts/stateface/*',
                'fonts/zocial/*'
            ],
            dest: 'wp-plugins/customer-area/skins/frontend/master/assets/fonts/framework'
        },
        'copy-framework-libs-imgs': {
            cwd: 'vendor/other/framework/theme/assets/img',
            expand: true,
            src: [
                '*'
            ],
            dest: 'wp-plugins/customer-area/skins/frontend/master/assets/img/framework'
        }
    };
};