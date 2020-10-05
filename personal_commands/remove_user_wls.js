const path = require('path');
const constants = require('consts');
module.exports = {
    name: path.basename(__filename).split('.').slice(0, -1).join('.'),
    description: 'Remvoe a user from an authorization setting.',
    help: '__Input__' +
        '\n' +
        '[settingName] [username1] ... [usernameN]' +
        '\n\n' +
        '__Arguments__' +
        '\n' +
        '`[settingName]` - The name of the settings you wish to remove the user from.' +
        '\n' +
        '`[username1]` - A username of a user you wish to remove to the settings.',
    args: true,
    execute(client, message, args) {
        if (args.length === 0) {
            message.channel.send('No arguments were sent.');
        } else {

            // Get all command's options which were sent
            let commandOptions = [];
            while (args[0].startsWith(constants.COMMAND_OPTION_PREFIX)) {
                commandOptions.push(args.shift());
            }

            // Arguments
            const setting = args[0];

            const authorizationCommandManager = require('authorization_command_manager');
            const authorizationSettings = new authorizationCommandManager.authorizationSettings();

            if (authorizationSettings.auth_settings_exists(setting)) {

                for (let index = 1; index < args.length; index++) {
                    const username = args[index];
                    authorizationSettings.remove_user(setting, username);
                }

                client.personalCommand.get('gas').execute(client, message, [setting]); // To show the the new settings
            } else {
                message.channel.send(`Setting \`${setting}\` doesn't exist.`);
            }
        }
    },
};
