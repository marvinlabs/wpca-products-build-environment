module.exports = function (grunt, options) {

    var targets = {};

    targets['customer-area'] = {
            options: {
                repository: 'git@github.com:marvinlabs/customer-area.git',
                branch: 'master',
                directory: options.paths.base_plugin
            }
        };
    targets['customer-area-framework'] = {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/wpca-framework.git',
                branch: 'master',
                directory: 'vendor/other/framework'
            }
        };
    targets['customer-area-twenty-twelve'] = {
            options: {
                repository: 'git@github.com:marvinlabs/wpca-twenty-twelve.git',
                branch: 'master',
                directory: 'wp-themes/wpca-twenty-twelve'
            }
        };
    targets['customer-area-advanced-custom-fields-pro'] = {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/advanced-custom-fields-pro.git',
                branch: 'master',
                directory: options.paths.plugins + '/advanced-custom-fields-pro'
            }
        };
    targets['customer-area-acf-integration'] = {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-acf-integration.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-acf-integration'
            }
        };
    targets['customer-area-collaboration'] = {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-collaboration.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-collaboration'
            }
        };
    targets['customer-area-conversations'] = {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-conversations.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-conversations'
            }
        };
    targets['customer-area-design-extras'] = {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-design-extras.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-design-extras'
            }
        };
    targets['customer-area-enhanced-files'] = {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-enhanced-files.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-enhanced-files'
            }
        };
    targets['customer-area-extended-permissions'] = {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-extended-permissions.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-extended-permissions'
            }
        };
    targets['customer-area-extended-invoicing'] = {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-invoicing.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-invoicing'
            }
        };
    targets['customer-area-login-form'] = {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-login-form.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-login-form'
            }
        };
    targets['customer-area-managed-groups'] = {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-managed-groups.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-managed-groups'
            }
        };
    targets['customer-area-master-demo'] = {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-master-demo.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-master-demo'
            }
        };
    targets['customer-area-notifications'] = {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-notifications.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-notifications'
            }
        };
    targets['customer-area-owner-restriction'] = {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-owner-restriction.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-owner-restriction'
            }
        };
    targets['customer-area-paypal-gateway'] = {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-paypal-gateway.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-paypal-gateway'
            }
        };
    targets['customer-area-projects'] = {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-projects.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-projects'
            }
        };
    targets['customer-area-protect-post-types'] = {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-protect-post-types.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-protect-post-types'
            }
        };
    targets['customer-area-smart-groups'] = {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-smart-groups.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-smart-groups'
            }
        };
    targets['customer-area-stripe-gateway'] = {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-stripe-gateway.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-stripe-gateway'
            }
        };
    targets['customer-area-switch-users'] = {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-switch-users.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-switch-users'
            }
        };
    targets['customer-area-tasks'] = {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-tasks.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-tasks'
            }
        };
    targets['customer-area-unread-documents'] = {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-unread-documents.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-unread-documents'
            }
        };
    targets['customer-area-terms-of-service'] = {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/wpca-terms-of-service.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-terms-of-service'
            }
        };

    return targets;
};