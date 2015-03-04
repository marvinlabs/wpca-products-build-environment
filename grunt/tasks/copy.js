module.exports = function (grunt, options) {
    return {
        cuar_addon_libs: {
            cwd: '',
            src: '../customer-area/libs/cuar/**/*',
            dest: 'libs/cuar',
            expand: true
        }
    };
};