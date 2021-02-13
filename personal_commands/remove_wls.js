const path = require('path');
module.exports = {
    name: path.basename(__filename).split('.').slice(0, -1).join('.'),
    description: 'Remove authorization setting.',
    help: '__Input__' +
        '\n' +
        '[settingName]' +
        '\n\n' +
        '__Argument__' +
        '\n' +
        '`[settingName]` - The name of the setting which will be removed.',
    args: true,
    execute(client, message, args) {
        if (args.length === 0) {
            message.channel.send('No arguments were sent.');
        } else {
            const setting = args[0];

            const constants = require('../mypackage/consts');

            if (setting !== constants.AUTHORIZATION_SETTINGS_ROOT) {
                const authorizationCommandManager = require('../mypackage/authorization_command_manager');
                const authSettingManager = new authorizationCommandManager.authorizationSettings();

                authSettingManager.remove(setting);

                message.channel.send('The authorization settings was deleted.');
            } else {
                message.channel.send('Not allowed to deleted ' + constants.AUTHORIZATION_SETTINGS_ROOT + '.');
            }
        }
    },
};
