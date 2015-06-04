module.exports = function (grunt, options) {
    return {
        'clean-framework-src-js': {
            src: [
                'wp-plugins/customer-area/src/js/frontend/framework/*'
            ]
        },
        'clean-framework-libs-js': {
            src: [
                'wp-plugins/customer-area/libs/js/framework/*'
            ]
        },
        'clean-framework-libs-fonts': {
            src: [
                'wp-plugins/customer-area/skins/frontend/master/assets/fonts/framework/*'
            ]
        },
        'clean-framework-libs-imgs':{
            src: [
                'wp-plugins/customer-area/skins/frontend/master/assets/img/framework/*'
            ]
        }
    };
};