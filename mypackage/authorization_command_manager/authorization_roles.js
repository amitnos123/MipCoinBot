const log_writer = require('../log_writer');
const constants = require('../consts');
const lw = new log_writer(constants.LOG_DIRECTORY_PATH);
const data_manager = require('../data_manager');

module.exports = class authorization_roles extends data_manager {

    /**
     * Constructor authorization_roles object
     * @constructor
     */
    constructor() {
        super('AUTHORIZATION.json');

        this.authDataArr = this.load_data();
    }

    /**
    * Return true or false for, if the member is allowed to use the command based on the member roles in the guild
    * @param {string} id - id of the command
    * @param {GuildMember} member - The guild member which want to use the command
    * @returns {boolean} - Is the member is allowed to use the command
    */
    is_authorize(id, member) {
        const authCommand = this.authDataArr[id];

        //filter that will only take roles which the member have and the role exist in this.authDataArr
        const filteredRoles = member.roles.filter(function (role) { return authCommand.roles.includes(role.name); });
        if (filteredRoles.size > 0) {
            //If better then 0, the member have the role to use the command
            lw.log_message('debug', `User ${member.user.username} has roles which are authorize to use the command ${filteredRoles}`);
            return true;
        }
        else {
            //The member doeesn't have the auth to use the command
            lw.log_message('debug', `User ${member.user.username} doesn't has a role which is authorize to use the command`);
            return false;
        }
    }
};
