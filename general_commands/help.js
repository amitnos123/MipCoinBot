const path = require('path');
module.exports = {
    name: path.basename(__filename).split('.').slice(0, -1).join('.'),
    description: 'Give information on how to use the command and which options does it support.',
    help: '__Input__' +
        '\n' +
        '[Command name]' +
        '\n\n' +
        '__Argument__' +
        '\n' +
        '`[Command name]` - The command which return the information on.',
    args: true,
    execute(client, message, args) {
        if (args.length === 0) {
            message.channel.send('No command name was given.');
        } else {
            for (let index = 0; index < args.length; index++) {
                const commandName = args[index];
                if (client.generalCommand.has(commandName)) { // Type General
                    message.channel.send(create_help_command_embed_message(commandName, client.generalCommand.get(commandName), '#297780'));
                } else if (client.personalCommand.has(commandName)) { // Type DM \ Personal
                    message.channel.send(create_help_command_embed_message(commandName, client.personalCommand.get(commandName), '#297780'));
                } else if (client.serverCommand.has(commandName)) { // Type Text \ Server
                    message.channel.send(create_help_command_embed_message(commandName, client.serverCommand.get(commandName), '#297780'));
                }
            }
        }
    },
};

/**
 * Create a RichEmbed for the commands given
 * @param {module} command - The command's module
 * @param {string} title - Title if the RichEmbed
 * @param {string} color - Color of the RichEmbed
 * @returns {discord.RichEmbed} - The RichEmbed which was created and defined from the given commands, title, color
 */
function create_help_command_embed_message(title, command, color) {
    const discord = require('discord.js');
    const embed = new discord.RichEmbed()
        .setColor(color)
        .setTitle(title);

    if (command.help !== undefined) {
        embed.setDescription(command.help);
    } else {
        embed.setDescription('Help isn\'t defined of the command.');
    }
    return embed;
}