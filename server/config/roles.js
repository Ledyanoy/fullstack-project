const AccessControl = require('accesscontrol');

let grantsObject = {
    admin: {
        profile: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        },
        article: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        }
    },
    user: {
        profile: {
            'read:own': ['*', '!role', '!password', '!_id'],
            'update:own': ['*'],
            'delete:own': ['*']
        },
    },
    guest: {

    }
}

const roles = new AccessControl(grantsObject);

module.exports = {roles}
