const path = require('path');
const constants = require('consts');
const discord = require('discord.js');
module.exports = {
    name: path.basename(__filename).split('.').slice(0, -1).join('.'),
    help: 'Doesn\'t get a input',
    description: 'Returns list the bot\'s commands.',
    args: true,
    execute(client, message, args) {

        const log_writer = require('log_writer');
        const lw = new log_writer(constants.LOG_DIRECTORY_PATH);

        console.log('aaaa');
        lw.log_message('debug', 'test1');

        const embedCommandsExplanation = new discord.RichEmbed()
            .setColor('#ff0000') // RED
            .setTitle(':information_source:  Commands\' Explanation');

        commandsExplanationMessage = `The bot\'ts write send a message in the channel with \`${client.commandPrefix}\` in the start and right after that, without space between, write the command's name`;
        commandsExplanationMessage += '\n\n';
        commandsExplanationMessage += 'To send arguments to the fuction, you write them down after the command\'s name. Need to be a space between the command\'s name and each argument.';
        commandsExplanationMessage += '\n\n';
        commandsExplanationMessage += `If you would like to send an argument with space, then in the start of the argument write \`${constants.START_CHAR_LONG_ARGUMENT}\` and in the end write \`${constants.END_CHAR_LONG_ARGUMENT}\`.`;
        commandsExplanationMessage += '\n';
        commandsExplanationMessage += `For example: \`${client.commandPrefix}commandName ${constants.START_CHAR_LONG_ARGUMENT}this is a single argument${constants.END_CHAR_LONG_ARGUMENT}\``;
        commandsExplanationMessage += '\n\n';
        commandsExplanationMessage += `To use a command\'s options you send it at the first arguments.`;
        commandsExplanationMessage += '\n';
        commandsExplanationMessage += `For example: \`${client.commandPrefix}commandName ${constants.COMMAND_OPTION_PREFIX}commandOption argument1 argument2\``;
        commandsExplanationMessage += '\n\n';
        commandsExplanationMessage += 'To see the arguments for a command and which options it support, use the command `help`. The command `help` require a single argument, a command\'s name';
        commandsExplanationMessage += '\n';
        commandsExplanationMessage += 'Try it by typing `+help help`';
        commandsExplanationMessage += '\n\n';
        commandsExplanationMessage += ':globe_with_meridians: `General Commands` which are only called from `DM the bot` and `inside the server`';
        commandsExplanationMessage += '\n\n';
        commandsExplanationMessage += ':robot: `Personal Commands` are commands which are only called from `DM the bot`';
        commandsExplanationMessage += '\n\n';
        commandsExplanationMessage += ':desktop: `Server Commands` are commands which are only called from `inside the server`';
        embedCommandsExplanation.setDescription(commandsExplanationMessage);
        message.channel.send(embedCommandsExplanation);

        const embedCommandOptionsMessage = new discord.RichEmbed()
            .setColor('#ff9900') // ORANGE
            .setTitle(':tools:  Commands\'s Options');

        commandOptionsMessage = 'To use a command option, you write it before the arguments you give the command.';
        commandOptionsMessage += '\n\n';
        commandOptionsMessage += `\`${constants.COMMAND_OPTION_ADD}\`: ${constants.COMMAND_OPTION_ADD_DESCRIPTION}.`;
        commandOptionsMessage += '\n';
        commandOptionsMessage += `\`${constants.COMMAND_OPTION_DONT_CHANGE}\`: ${constants.COMMAND_OPTION_DONT_CHANGE_DESCRIPTION}`;
        commandOptionsMessage += '\n';
        commandOptionsMessage += `\`${constants.COMMAND_OPTION_ALL}\`: ${constants.COMMAND_OPTION_ALL_DESCRIPTION}`;
        embedCommandOptionsMessage.setDescription(commandOptionsMessage);
        message.channel.send(embedCommandOptionsMessage);

        message.channel.send(command_list_embed_message(client.generalCommand, ':globe_with_meridians: General Commands - Called from anywhere', '#ffff00')); // Yellow

        message.channel.send(command_list_embed_message(client.personalCommand, ':robot: Personal Commands - Called from DM', '#00ff00')); // Green

        message.channel.send(command_list_embed_message(client.serverCommand, ':desktop: Server Commands - Called from Server', '#00ffff')); // Cyan
    },
};

/**
 * Create a RichEmbed for the commands given
 * @param {discord.Collection} commands - The commands which will be in the list
 * @param {string} title - Title if the RichEmbed
 * @param {string} color - Color of the RichEmbed
 * @returns {discord.RichEmbed} - The RichEmbed which was created and defined from the given commands, title, color
 */
function command_list_embed_message(commands, title, color) {
    const embed = new discord.RichEmbed()
        .setColor(color)
        .setTitle(title);

    // command[0] - key
    // command[1] - module
    let messageDescription = '';
    for (const com of commands) {
        messageDescription += `\`${com[0]}\`: ${com[1].description}`;
        messageDescription += '\n\n';
    }
    embed.setDescription(messageDescription);
    return embed;
}