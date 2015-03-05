module.exports = function (grunt, options) {
    // Simply add a table of contents of our build
    return {
        options: {
            removeAd: true,
            header: "## Table of Contents"
        },
        build_env: {
            github: true,
            target: "./README.md"
        }
    };
};