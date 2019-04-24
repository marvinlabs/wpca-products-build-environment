module.exports = function (grunt, options) {

    return {
        customer_area: {
            options: {
                repository: 'git@github.com:marvinlabs/customer-area.git',
                branch: 'master',
                directory: options.paths.base_plugin
            }
        },
        customer_area_framework: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/wpca-framework.git',
                branch: 'master',
                directory: 'vendor/other/framework'
            }
        },
        customer_area_twenty_twelve: {
            options: {
                repository: 'git@github.com:marvinlabs/wpca-twenty-twelve.git',
                branch: 'master',
                directory: 'wp-themes/wpca-twenty-twelve'
            }
        },
        customer_area_advanced_custom_fields_pro: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/advanced-custom-fields-pro.git',
                branch: 'master',
                directory: options.paths.plugins + '/advanced-custom-fields-pro'
            }
        },
        customer_area_acf_integration: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-acf-integration.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-acf-integration'
            }
        },
        customer_area_collaboration: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-collaboration.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-collaboration'
            }
        },
        customer_area_conversations: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-conversations.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-conversations'
            }
        },
        customer_area_design_extras: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-design-extras.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-design-extras'
            }
        },
        customer_area_enhanced_files: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-enhanced-files.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-enhanced-files'
            }
        },
        customer_area_extended_permissions: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-extended-permissions.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-extended-permissions'
            }
        },
        customer_area_extended_invoicing: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-invoicing.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-invoicing'
            }
        },
        customer_area_login_form: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-login-form.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-login-form'
            }
        },
        customer_area_managed_groups: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-managed-groups.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-managed-groups'
            }
        },
        customer_area_master_demo: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-master-demo.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-master-demo'
            }
        },
        customer_area_notifications: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-notifications.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-notifications'
            }
        },
        customer_area_owner_restriction: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-owner-restriction.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-owner-restriction'
            }
        },
        customer_area_paypal_gateway: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-paypal-gateway.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-paypal-gateway'
            }
        },
        customer_area_projects: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-projects.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-projects'
            }
        },
        customer_area_protect_post_types: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-protect-post-types.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-protect-post-types'
            }
        },
        customer_area_smart_groups: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-smart-groups.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-smart-groups'
            }
        },
        customer_area_stripe_gateway: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-stripe-gateway.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-stripe-gateway'
            }
        },
        customer_area_switch_users: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-switch-users.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-switch-users'
            }
        },
        customer_area_tasks: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-tasks.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-tasks'
            }
        },
        customer_area_unread_documents: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-unread-documents.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-unread-documents'
            }
        },
        customer_area_terms_of_service: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/wpca-terms-of-service.git',
                branch: 'master',
                directory: options.paths.plugins + '/customer-area-terms-of-service'
            }
        },

    };
};