const path = require('path');
const colorArr = ['#ff0000' /*RED*/, '#ff9900' /*ORANGE*/, '#ffff00' /*YELLOW*/, '#00ff00' /*GREEN*/, '#00ffff' /*CYAN*/];

module.exports = {
    name: path.basename(__filename).split('.').slice(0, -1).join('.'),
    description: 'Get the authorization for all the commands or for a specific commands.',
    help: '__Input__' +
        '\n' +
        '[commandName]' +
        '\n\n' +
        '__Argument__' +
        '\n' +
        '`[commandName]` - The name of the command which it\'s authorization will be retuned.' +
        '\n' +
        ' ** If not given**, it will return for all the commands',
    args: true,
    execute(client, message, args) {
        const commandsIdManager = require('../mypackage/commands_id_manager');
        const authorizationCommandManager = require('../mypackage/authorization_command_manager');

        const authComManager = new authorizationCommandManager();
        const comIdManager = new commandsIdManager();
        let authMessageList = {};

        let sendMessage = '';

        if (args.length === 0) {
            const authList = authComManager.get();
            const commandsId = comIdManager.get_id();

            for (let prop in commandsId) {
                if (commandsId.hasOwnProperty(prop)) {
                    authMessageList[prop] = authList[commandsId[prop]];
                }
            }

            let colorCounter = 0;
            for (let key in authMessageList) {
                if (authMessageList.hasOwnProperty(key)) {
                    sendMessage = message_single_command(authMessageList[key], key, colorArr[colorCounter]);
                    message.channel.send(sendMessage);

                    colorCounter++;
                    colorCounter = colorCounter % colorArr.length; // Reset everytime it gets to 5
                }
            }
        } else {
            const commandName = args[0];
            const commandId = comIdManager.get_id(commandName);

            if (commandId === undefined) {
                message.channel.send('Command doesn\'t exist');
                return; // Finish command here
            }

            authMessageList = authComManager.get(commandId);

            console.log(authMessageList);
            console.log(commandId);

            sendMessage = message_single_command(authMessageList, commandName, colorArr[0]);
            message.channel.send(sendMessage);
        }

        if (authMessageList === undefined) {
            sendMessage = 'Command doesn\'t has authorization.';
            message.channel.send(sendMessage);
        }
    },
};

/**
 * Function which return the message to send, for a given command
 * @param {JSON} commandJson - Json of the command that hold the authrazation data on the command
 * @param {string} commandName - The name of the command
 * @param {string} color - The color of the embed
 * @returns {string} - Return the message for a command
 */
function message_single_command(commandJson, commandName, color) {
    const discord = require('discord.js');
    const message = new discord.RichEmbed()
        .setTitle(`Command - ${commandName}`)
        .setColor(color);

    let description = '';
    if (commandJson !== undefined) {
        description += `type = ${commandJson.type}\n`;

        if (commandJson.roles !== undefined) {
            description += `roles = ${JSON.stringify(commandJson.roles)}\n`;
        }

        if (commandJson.settings !== undefined) {
            description += `settings = ${JSON.stringify(commandJson.settings)}\n`;
        }
    } else {
        description += 'Empty';
    }
    description += "\n";

    message.setDescription(description);

    return message;
}