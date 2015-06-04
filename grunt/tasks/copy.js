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
            cwd: 'vendor/other/framework/theme/vendor/plugins',
            expand: true,
            src: [
                'animate/**',
                'bstimeout/**',
                'bstour/**',
                'c3charts/**',
                'canvaslog/**',
                'circles/**',
                'ckeditor/**',
                'colorpicker/**',
                'countdown/**',
                'cropper/**',
                'datatables/**',
                'datepicker/**',
                'daterange/**',
                'dropzone/**',
                'duallistbox/**',
                'fancytree/**',
                'fileuploads/**',
                'flip/**',
                'footable/**',
                'fullcalendar/**',
                'globalize/**',
                'gmap/**',
                'highcharts/**',
                'highlight/**',
                'holder/**',
                'imagezoom/**',
                'jquery.spin/**',
                'jquerydial/**',
                'jqueryflot/**',
                'jquerymask/**',
                'jvectormap/**',
                'ladda/**',
                'lazyline/**',
                'magnific/**',
                'map/**',
                'mapplic/**',
                'markdown/**',
                'markitup/**',
                'maxlength/**',
                'mixitup/**',
                'moment/**',
                'nestable/**',
                'nprogress/**',
                'oggrid/**',
                'pnotify/**',
                'select2/**',
                'slick/**',
                'sparkline/**',
                'summernote/**',
                'tabdrop/**',
                'tagmanager/**',
                'tagsinput/**',
                'typeahead/**',
                'validate/**',
                'waypoints/**',
                'xeditable/**'
            ],
            dest: 'wp-plugins/customer-area/libs/js/framework'
        },
        'copy-framework-libs-fonts': {
            cwd: 'vendor/other/framework/theme/assets/fonts',
            expand: true,
            src: [
                'admindesigns/*',
                'font-awesome/*',
                'glyphicons/*',
                'glyphicons-pro/*',
                'icomoon/*',
                'iconsweets/*',
                'octicons/*',
                'open-sans/*',
                'stateface/*',
                'zocial/*'
            ],
            dest: 'wp-plugins/customer-area/skins/frontend/master/assets/fonts/framework'
        },
        'copy-framework-libs-imgs': {
            cwd: 'vendor/other/framework/theme/assets/img',
            expand: true,
            src: [
                '**'
            ],
            dest: 'wp-plugins/customer-area/skins/frontend/master/assets/img/framework'
        }
    };
};