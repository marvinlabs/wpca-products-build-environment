module.exports = function (grunt, options) {
    return {
        txpull: { // Pull Transifex translation - grunt exec:txpull
            cmd: 'tx pull -a --minimum-perc=20' // Change the percentage with --minimum-perc=yourvalue
        },
        txpush_s: { // Push pot to Transifex - grunt exec:txpush_s
            cmd: 'tx push -s'
        },
        "yarn-update": {
            cwd: 'wp-plugins/customer-area',
            cmd: 'yarn install'
        },
        "composer-update": {
            cwd: 'vagrant',
            cmd: "vagrant ssh -c \"cd /srv/www/wordpress-local/public_html/wp-plugins/customer-area && composer update\""
        }
    };
};