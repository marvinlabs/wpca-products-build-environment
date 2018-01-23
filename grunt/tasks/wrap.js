module.exports = function (grunt, options) {
    return {
        'summernote-image-attributes': {
            src: ['wp-plugins/customer-area/libs/js/bower/summernote-image-attributes/summernote-image-attributes.min.js'],
            dest: 'wp-plugins/customer-area/libs/js/bower/summernote-image-attributes/summernote-image-attributes.min.js',
            options: {
                separator: '',
                indent: '',
                wrapper: ["(function(factory){if(typeof define === 'function' && define.amd) {define(['jquery'], factory);} else if (typeof module === 'object' && module.exports) {module.exports = factory(require('jquery'));} else {factory(window.jQuery);}}(function ($) {'use strict';", '}));']
            }
        }
    };
};