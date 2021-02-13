const log_writer = require('../log_writer');
const constants = require('../consts');
const lw = new log_writer(constants.LOG_DIRECTORY_PATH);
const data_manager = require('../data_manager');

module.exports = class authorization_settings extends data_manager {

    /**
     * Constructor authorization_settings object
     * @constructor
     * */
    constructor() {
        super('AUTHORIZE_SETTINGS.json');

        this.authSettingsArr = this.load_data();
    }

    /**
     * Return a single object of settings or object with each propery is a object setting by itself.
     * @param {string} setting - string of the name of the setting
     * @returns {object} - If setting is defined then Object settings. If undefined then object with each propery is a object setting.
     */
    get(setting) {
        if (setting !== undefined) {
            if (this.auth_settings_exists(setting)) {
                return this.authSettingsArr[setting];
            } else {
                return null;
            }
        } else {
            return this.authDataArr;
        }
    }

    /**
     * Create a new authorize setting
     * @param {string} setting - The name of the new setting
     * @returns {void}
     */
    create(setting) {
        if (this.authSettingsArr[setting] !== undefined) {
            const errorMessage = `Authorization setting id='${id}' already exist`;
            lw.log_message('error', errorMessage);
            throw new Error(errorMessage);
        }

        this.authSettingsArr[setting] = [];


        this.save_data(this.authSettingsArr);
    }

    /**
     * Remove authorize setting
     * @param {string} setting - The name of the setting which will be removed
     * @returns {void}
     */
    remove(setting) {
        if (this.authSettingsArr[setting] === undefined) {
            const errorMessage = `authorization setting '${setting}' doesn't exist`;
            lw.log_message('error', errorMessage);
            throw new Error(errorMessage);
        }

        delete this.authSettingsArr[setting];

        this.save_data(this.authSettingsArr);
    }

    /**
     * Adding user to authorize setting
     * @param {string} setting - The name of the setting which will the user\s be added
     * @param {string\array(string)} usernameArr - Array of username or single username which will be added to the authorize setting
     * @returns {void}
     */
    add_user(setting, usernameArr) {
        if (!this.auth_settings_exists(setting)) {
            const errorMessage = `authorization setting '${setting}' doesn't exist`;
            lw.log_message('error', errorMessage);
            throw new Error(errorMessage);
        }

        if (Array.isArray(usernameArr)) { // usernameArr is array(string)
            for (let index = 0; index < usernameArr.length; index++) {
                this.authSettingsArr[setting].push(usernameArr[index]);
            }
        } else { // usernameArr is string
            this.authSettingsArr[setting].push(usernameArr);
        }

        this.save_data(this.authSettingsArr);
    }

    /**
     * Revmoing user to authorize setting
     * @param {string} setting - The name of the setting which will be removed
     * @param {string\array(string)} usernameArr - Array of username or single username which will be removed to the authorize setting
     * @returns {void}
     */
    remove_user(setting, usernameArr) {
        if (!this.auth_settings_exists(setting)) {
            const errorMessage = `authorization setting '${setting}' doesn't exist`;
            lw.log_message('error', errorMessage);
            throw new Error(errorMessage);
        }

        if (Array.isArray(usernameArr)) { // usernameArr is array(string)
            for (let index = 0; index < usernameArr.length; index++) {
                const username = usernameArr[index];
                const indexToDelete = this.authSettingsArr[setting].findIndex((element) => element === username);
                if (indexToDelete !== -1) {
                    this.authSettingsArr[setting].splice(indexToDelete, 1);
                }
            }
        } else { // usernameArr is string
            const indexToDelete = this.authSettingsArr[setting].findIndex((element) => element === usernameArr);
            if (indexToDelete !== -1) {
                this.authSettingsArr[setting].splice(indexToDelete, 1);
            }
        }

        this.save_data(this.authSettingsArr);
    }

    /**
     * Remove everyone that belongs to that settings, but doesn't delete it
     * @param {string} setting  - The name of the setting which will be cleard
     */
    clear_users(setting) {
        if (!this.auth_settings_exists(setting)) {
            const errorMessage = `authorization setting '${setting}' doesn't exist`;
            lw.log_message('error', errorMessage);
            throw new Error(errorMessage);
        }

        if (this.authSettingsArr[setting].length > 0) { // If it's 0 then there is no need to do something. Avoiding saving without update
            this.authSettingsArr[setting] = [];

            this.save_data(this.authSettingsArr);
        }
    }

    /**
    * Return true or false for, if the member is allowed to use the command based on the member roles\settings in the bot. Root able to do all
    * @param {string} id - id of the command
    * @param {User} author - The author of the message which called the command
    * @returns {boolean} - Is the member is allowed to use the command
    */
    is_authorize(id, author) {

        //If member is root, then let the user use the command without checking
        if (this.authSettingsArr[constants.AUTHORIZATION_SETTINGS_ROOT].includes(author.username)) {
            lw.log_message('debug', `User ${author.username} was authorize because user is root`);
            return true;
        }

        //foreach settings the commands has:    
        //For given setting for the command, will check, if member has it. If found, return true, else continue search until the end
        let memberAllowed = false;
        const authorizationRoles = require('./authorization_roles.js');
        const authRoles = new authorizationRoles();
        const authCommand = authRoles.authDataArr[id];
        const authSettings = this.authSettingsArr; // Can't use 'this' in foreach, because it isn't defined in it

        if (authCommand === undefined) {
            lw.log_message('debug', `Command with id='${id}' was called by username='${author.username}' without the need of authorization'`);
            return true;
        }

        authCommand.settings.forEach(function (setting) {
            if (authSettings[setting].includes(author.username)) {
                lw.log_message('debug', `User ${author.username} was authorize because user is ${setting}`);
                memberAllowed = true; //If it's find that the member belong to one of the settings which are allowed to use the command, will turn to true
            }
        });

        if (!memberAllowed) { lw.log_message('debug', `User ${author.username} wasn't authorize`); }

        return memberAllowed;
    }

    /**
     * Returns if the given setting exist or not
     * @param {string} setting 
     * @returns {boolean} - If setting exists
     */
    auth_settings_exists(setting) {
        if (this.authSettingsArr[setting] === undefined) {
            return false;
        } else {
            return true;
        }
    }


    /**
     * Return if the user with that username belog to root settings or not
     * @param {string} username - user username
     * @returns {boolean} - Belong to root or not 
     */
    is_root(username) {
        if (this.authSettingsArr[constants.AUTHORIZATION_SETTINGS_ROOT].includes(username)) {
            return true;
        } else {
            return false;
        }
    }
};