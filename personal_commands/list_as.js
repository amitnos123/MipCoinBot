const path = require('path');
const colorArr = ['#ff0000' /*RED*/, '#ff9900' /*ORANGE*/, '#ffff00' /*YELLOW*/, '#00ff00' /*GREEN*/, '#00ffff' /*CYAN*/];

module.exports = {
    name: path.basename(__filename).split('.').slice(0, -1).join('.'),
    description: 'Get the all authorization settings or specific authorization settings',
    help: '__Input__' +
        '\n' +
        '[settingName]' +
        '\n\n' +
        '__Argument__' +
        '\n' +
        '`[settingName]` - The name of the setting which it\'s authorization will be retuned.' +
        '\n' +
        'Can give multiple settingNames' +
        '\n' +
        '**If not given**, it will return for all the settings',
    args: true,
    execute(client, message, args) {
        const authorizationCommandManager = require('../mypackage/authorization_command_manager');
        const authorizationSettings = new authorizationCommandManager.authorizationSettings();

        let messageSend = '';
        if (args.length === 0) { // Return all
            let colorCounter = 0;
            for (const settingName in authorizationSettings.authSettingsArr) {
                messageSend = message_single_setting(authorizationSettings.authSettingsArr[settingName], settingName, colorArr[colorCounter]);
                message.channel.send(messageSend);

                colorCounter++;
                colorCounter = colorCounter % 5;
            }
        } else { // Givin spesific settings
            for (let index = 0; index < args.length; index++) {
                const settingName = args[index];
                const settingJson = authorizationSettings.get(settingName);
                if (settingJson !== undefined) {
                    messageSend = message_single_setting(settingJson, settingName, colorArr[0]);
                    message.channel.send(messageSend);
                }
            }
        }
    },
};

/**
 * Function which return the message to send, for a given setting
 * @param {JSON} settingJson - Json of the setting that hold the authrazation data
 * @param {string} settingName - The name of the setting
 * @param {string} color - The color of the embed
 * @returns {string} - Return the message for a setting
 */
function message_single_setting(settingJson, settingName, color) {
    const discord = require('discord.js');
    const message = new discord.RichEmbed()
        .setTitle(`Setting - ${settingName}`)
        .setColor(color);

    let description = '';
    if (settingJson.length > 0) {
        for (let innerIndex = 0; innerIndex < settingJson.length; innerIndex++) {
            const innerProp = settingJson[innerIndex];
            description += `${innerProp}, `;
        }
        description = description.substring(0, description.length - 2); // remove last 2 chars which are ", "
    } else {
        description += 'Empty';
    }

    message.setDescription(description);

    return message;
}