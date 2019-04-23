module.exports = function (grunt, options) {

    return {
        customer_area: {
            options: {
                repository: 'git@github.com:marvinlabs/customer-area.git',
                branch: 'develop',
                directory: options.paths.base_plugin
            }
        },
        customer_area_framework: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/wpca-framework.git',
                branch: 'develop',
                directory: 'vendor/other/framework'
            }
        },
        customer_area_twenty_twelve: {
            options: {
                repository: 'git@github.com:marvinlabs/wpca-twenty-twelve.git',
                branch: 'develop',
                directory: 'wp-themes/wpca-twenty-twelve'
            }
        },
        customer_area_acf_integration: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-acf-integration.git',
                branch: 'develop',
                directory: options.paths.plugins + '/customer_area_acf_integration'
            }
        },
        customer_area_collaboration: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-collaboration.git',
                branch: 'develop',
                directory: options.paths.plugins + '/customer_area_collaboration'
            }
        },
        customer_area_conversations: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-conversations.git',
                branch: 'develop',
                directory: options.paths.plugins + '/customer_area_conversations'
            }
        },
        customer_area_design_extras: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-design-extras.git',
                branch: 'develop',
                directory: options.paths.plugins + '/customer_area_design_extras'
            }
        },
        customer_area_enhanced_files: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-enhanced-files.git',
                branch: 'develop',
                directory: options.paths.plugins + '/customer_area_enhanced_files'
            }
        },
        customer_area_extended_permissions: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-extended-permissions.git',
                branch: 'develop',
                directory: options.paths.plugins + '/customer_area_extended_permissions'
            }
        },
        customer_area_extended_invoicing: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-invoicing.git',
                branch: 'develop',
                directory: options.paths.plugins + '/customer_area_invoicing'
            }
        },
        customer_area_login_form: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-login-form.git',
                branch: 'develop',
                directory: options.paths.plugins + '/customer_area_login_form'
            }
        },
        customer_area_managed_groups: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-managed-groups.git',
                branch: 'develop',
                directory: options.paths.plugins + '/customer_area_managed_groups'
            }
        },
        customer_area_master_demo: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-master-demo.git',
                branch: 'develop',
                directory: options.paths.plugins + '/customer_area_master_demo'
            }
        },
        customer_area_notifications: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-notifications.git',
                branch: 'develop',
                directory: options.paths.plugins + '/customer_area_notifications'
            }
        },
        customer_area_owner_restriction: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-owner-restriction.git',
                branch: 'develop',
                directory: options.paths.plugins + '/customer_area_owner_restriction'
            }
        },
        customer_area_paypal_gateway: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-paypal-gateway.git',
                branch: 'develop',
                directory: options.paths.plugins + '/customer_area_paypal_gateway'
            }
        },
        customer_area_projects: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-projects.git',
                branch: 'develop',
                directory: options.paths.plugins + '/customer_area_projects'
            }
        },
        customer_area_protect_post_types: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-protect-post-types.git',
                branch: 'develop',
                directory: options.paths.plugins + '/customer_area_protect_post_types'
            }
        },
        customer_area_smart_groups: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-smart-groups.git',
                branch: 'develop',
                directory: options.paths.plugins + '/customer_area_smart_groups'
            }
        },
        customer_area_stripe_gateway: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-stripe-gateway.git',
                branch: 'develop',
                directory: options.paths.plugins + '/customer_area_stripe_gateway'
            }
        },
        customer_area_switch_users: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-switch-users.git',
                branch: 'develop',
                directory: options.paths.plugins + '/customer_area_switch_users'
            }
        },
        customer_area_tasks: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-tasks.git',
                branch: 'develop',
                directory: options.paths.plugins + '/customer_area_tasks'
            }
        },
        customer_area_unread_documents: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/customer-area-unread-documents.git',
                branch: 'develop',
                directory: options.paths.plugins + '/customer_area_unread_documents'
            }
        },
        customer_area_terms_of_service: {
            options: {
                repository: 'git@bitbucket.org:wp-customerarea/wpca-terms-of-service.git',
                branch: 'develop',
                directory: options.paths.plugins + '/customer_area_terms_of_service'
            }
        },

    };
};