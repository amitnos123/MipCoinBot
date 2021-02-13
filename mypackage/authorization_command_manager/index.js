const log_writer = require('../log_writer');
const constants = require('../consts');
const lw = new log_writer(constants.LOG_DIRECTORY_PATH);
const data_manager = require('../data_manager');

module.exports = class authorization_command_manager extends data_manager {
    /* jshint ignore:start */
    static authorizationSettings = require('./authorization_settings.js');
    /* jshint ignore:end */

    /**
     * Constructor authorization_command object
     * @constructor
    */
    constructor() {
        super('AUTHORIZATION.json');

        const authorizationRoles = require('./authorization_roles.js');
        const authorizationSettings = require('./authorization_settings.js');

        this.authRoles = new authorizationRoles();
        this.authSettings = new authorizationSettings();

        this.authDataArr = this.authRoles.authDataArr;
        this.authSettingsArr = this.authSettings.authSettingsArr;
    }

    /**
     * Return true or false for, if the member is allowed to use the command. Used for commands which are called through DM
     * @param {string} id - id of the command
     * @param {User} author - The author of the message which called the command
     * @returns {boolean} - Is the member is allowed to use the command
     */
    auth_dm_command(id, author) {
        if (author === undefined) {
            const errorMessage = 'auth_dm_command didn\'t get a author';
            lw.log_message('error', errorMessage);
            throw new Error(errorMessage);
        }
        if (id === undefined) {
            const errorMessage = 'auth_dm_command didn\'t get a id';
            lw.log_message('error', errorMessage);
            throw new Error(errorMessage);
        }

        const memberIsAuth = this.authSettings.is_authorize(id, author);

        return memberIsAuth;
    }

    /**
     * Return true or false for, if the member is allowed to use the command. Used for commands which are called through the server
     * @param {string} id - id of the command
     * @param {GuildMember} member - The guild member which want to use the command
     * @returns {boolean} - Is the member is allowed to use the command
     */
    auth_text_command(id, member) {
        if (member === undefined) {
            const errorMessage = 'auth_text_command didn\'t get a member';
            lw.log_message('error', errorMessage);
            throw new Error(errorMessage);
        }
        if (id === undefined) {
            const errorMessage = 'auth_text_command didn\'t get a id';
            lw.log_message('error', errorMessage);
            throw new Error(errorMessage);
        }
        if (this.authDataArr[id] === undefined) {
            return true;
        }
        if (this.authSettings.is_root(member.user.username)) {
            return true;
        }


        const authType = this.authDataArr[id].type;
        lw.log_message('debug', `User ${member.user.username} requested to use command with id='${id}' type='${authType}'`);

        if (authType === constants.AUTHORIZATION_TYPE_ROLE) { //If the command with auth by the member role
            return this.authRoles.is_authorize(id, member);
        } else if (authType === constants.AUTHORIZATION_TYPE_SETTINGS) {//If the command with auth by the member settings
            return this.authSettings.is_authorize(id, member.user);
        }
        lw.log_message('debug', `command with id='${id}' doesn't has authorization`);
        return true;
    }

    /**
     * Create a command authorization
     * @param {string} id - Id of the command
     * @param {string} type - The type of the authorization. For examples: 'role' 'settings'
     * @param {Array} authGroup - The group which is authorize to use the command. For example, if type is 'role', then the array will hold all the roles which are allowed to use the command
     * @returns {void}
     */
    auth_create_command(id, authType, authGroup) {
        const constants = require('consts');

        if (this.authDataArr[id] !== undefined) {
            const errorMessage = `authorization for the id='${id}' already exist`;
            lw.log_message('error', errorMessage);
            throw new Error(errorMessage);
        }

        this.authDataArr[id] = { type: authType };

        switch (authType) {
            case constants.AUTHORIZATION_TYPE_ROLE:
                this.authDataArr[id].roles = authGroup;
                break;
            case constants.AUTHORIZATION_TYPE_SETTINGS:
                this.authDataArr[id].settings = authGroup;
                break;
            default:
                const errorMessage = `Failed to create authorization for command with the id='${id}'. Auth Type isn't ${authType} isn't defined.`;
                lw.log_message('error', errorMessage);
                throw new Error(errorMessage);
        }

        this.save_data(this.authDataArr);
    }

    /**
     * Update a command authorization
     * @param {string} id - Id of the command
     * @param {string} type - The type of the authorization. For examples: 'role' 'settings'
     * @param {Array} authGroup - The group which is authorize to use the command. For example, if type is 'role', then the array will hold all the roles which are allowed to use the command
     * @returns {void}
     */
    auth_update_command(id, authType, authGroup) {
        const constants = require('consts');

        if (this.authDataArr[id] === undefined) {
            const errorMessage = `authorization for the id='${id}' doesn't exist`;
            lw.log_message('error', errorMessage);
            throw new Error(errorMessage);
        }

        if (authType !== undefined && authType !== null) {
            this.authDataArr[id].type = authType;
        }


        if (authGroup !== undefined) {
            switch (this.authDataArr[id].type) { // this.authDataArr[id].type is already updated with the new one
                case constants.AUTHORIZATION_TYPE_ROLE:
                    this.authDataArr[id].roles = authGroup;
                    break;
                case constants.AUTHORIZATION_TYPE_SETTINGS:
                    this.authDataArr[id].settings = authGroup;
                    break;
                default:
                    return;
                // break;
            }
        }

        this.save_data(this.authDataArr);
    }

    /**
     * Remove the command from authorization
     * @param {string} id - Id of the command
     * @returns {void}
     */
    auth_remove_command(id) {
        if (this.authDataArr[id] === undefined) {
            const errorMessage = `authorization for the id='${id}' doesn't exist`;
            lw.log_message('error', errorMessage);
            throw new Error(errorMessage);
        }

        delete this.authDataArr[id];

        this.save_data(this.authDataArr);
    }

    /**
     * Create a new authorize setting
     * @param {string} setting - The name of the new setting
     * @returns {void}
     */
    settings_create(setting) {
        this.authSettings.create(setting);
    }

    /**
     * Remove authorize setting
     * @param {string} setting - The name of the setting which will be removed
     * @returns {void}
     */
    settings_remove(setting) {
        this.authSettings.remove(setting);
    }

    /**
     * Adding user to authorize setting
     * @param {string} setting - The name of the setting which will be removed
     * @param {string\array(string)} usernameArr - Array of username or single username which will be added to the authorize setting
     * @returns {void}
     */
    settings_add_user(setting, usernameArr) {
        this.authSettings.add_user(setting, usernameArr);
    }

    /**
     * 
     * @param {string} id - Id of the command
     */
    auth_exists(id) {
        if (this.authDataArr[id] === undefined) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * 
     * @param {string} id - Id of the command. If not given, will return all
     */
    get(id) {
        if (id !== undefined) {
            if (this.auth_exists(id)) {
                return this.authDataArr[id];
            } else {
                return null;
            }
        } else {
            return this.authDataArr;
        }
    }
};