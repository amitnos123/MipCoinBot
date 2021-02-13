const path = require('path');
const constants = require('../mypackage/consts');
module.exports = {
    name: path.basename(__filename).split('.').slice(0, -1).join('.'),
    description: 'Create\\update the whitelist for a command.',
    help: '__Input__' +
        '\n' +
        '[commandName] [authType] [role1\\setting1] ... [roleN\\settingN]' +
        '\n\n' +
        '__Support Options__' +
        '\n' +
        `\`${constants.COMMAND_OPTION_DONT_CHANGE}\`: ${constants.COMMAND_OPTION_DONT_CHANGE_DESCRIPTION}` +
        '\n\n' +
        '__Arguments__' +
        '\n' +
        '`[commandName]` - The command\'s name which will have it whitelist create\\update.' +
        '\n' +
        '`[authType]` - Base on what the whitelist will work on.' +
        '\n' +
        `For roles in the server '${constants.AUTHORIZATION_TYPE_ROLE}'.` +
        '\n' +
        `For settings in the server '${constants.AUTHORIZATION_TYPE_SETTINGS}'.` +
        '\n' +
        '`[role1\\setting1]` - The role\\setting to add to thr whitelist.',
    args: true,
    execute(client, message, args) {
        if (args.length === 0) {
            message.channel.send('No arguments were sent.');
        } else {
            //Arguments
            const commandName = args[0];
            let authType = args[1];

            if (authType === constants.COMMAND_OPTION_DONT_CHANGE) {
                authType = undefined; // If authComManager.auth_update_command get 'undefined' then doesn't update this value
            }

            const commandsIdManager = require('../mypackage/commands_id_manager');
            const authorizationCommandManager = require('../mypackage/authorization_command_manager');

            const comIdManager = new commandsIdManager();
            const authComManager = new authorizationCommandManager();

            const commandId = comIdManager.get_id(commandName);

            // If auth for command doesn't exist
            if (!authComManager.auth_exists(commandId)) {
                authComManager.auth_create_command(commandId, constants.AUTHORIZATION_TYPE_ROLE, []);
            }

            if (authType !== undefined) {
                if (authType.localeCompare(constants.AUTHORIZATION_TYPE_ROLE) !== 0 && authType.localeCompare(constants.AUTHORIZATION_TYPE_SETTINGS) !== 0) {
                    message.channel.send(`'${authType}' isn't a valid type. Type may be '${constants.AUTHORIZATION_TYPE_ROLE}', '${constants.AUTHORIZATION_TYPE_SETTINGS}'`);
                }
            }

            let authGroup = [];
            if (args[2] !== constants.COMMAND_OPTION_DONT_CHANGE) {
                for (let index = 2; index < args.length; index++) {
                    const element = args[index];
                    authGroup.push(element);
                }
            } else {
                authGroup = undefined;
            }

            authComManager.auth_update_command(commandId, authType, authGroup);

            message.channel.send('Authorization was updated.');
        }
    },
};
