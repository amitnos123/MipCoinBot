const log_writer = require('../log_writer');
const constants = require('../consts');
const lw = new log_writer(constants.LOG_DIRECTORY_PATH);
const data_manager = require('../data_manager');

module.exports = class commands_id_manager extends data_manager {
    /**
     * @constructor
     */
    constructor() {
        super('COMMANDS_ID.json');

        this.dataArr = this.load_data();
    }

    /**
     * Return the id of a givin command by command name
     * @param {string} commandName - Name of the command which the you want the id for. If not given, will return all.
     * @returns {string\Array} The id of the command
     */
    get_id(commandName) {
        if (commandName !== undefined) {
            const commandId = this.dataArr[commandName];
            if (commandId !== undefined) {
                return commandId;
            } else {
                return undefined;
            }
        } else {
            return this.dataArr;
        }
        return undefined;
    }

    create_id(commandName) {
        const newCommandId = Object.keys(this.dataArr).length.toString();
        this.dataArr[commandName] = newCommandId;

        this.save_data(this.dataArr);

        lw.log_message('debug', `Creating id='${newCommandId}' for command '${commandName}'`);
        return newCommandId;
    }

    has_id(commandName) {
        if (this.dataArr[commandName] !== undefined) {
            return true;
        } else {
            return false;
        }
    }
};