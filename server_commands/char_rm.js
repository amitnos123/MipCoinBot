const path = require('path');
const constants = require('consts');
const log_writer = require('log_writer');
const lw = new log_writer(constants.LOG_DIRECTORY_PATH);
module.exports = {
    name: path.basename(__filename).split('.').slice(0, -1).join('.'),
    description: 'Create a character',
    help: '__Input__' +
        '\n' +
        '[character name]' +
        '\n\n' +
        '__Argument__' +
        '\n' +
        '`[character name]` - Name of the character',
    args: true,
    execute(client, message, args) {
        if (args.length !== 1) {
            return;
        } else {
            const moneyManager = require('money_manager');
            const moneyMan = new moneyManager();

            if (moneyMan.character_exists(args[0])) {
                const authorizationCommandManager = require('authorization_command_manager');
                const authComManager = new authorizationCommandManager();
                if (moneyMan.get(args[0]).owner === message.author.username || authComManager.is_root(message.author.username)) {
                    moneyMan.character_remove(args[0]);
                    message.channel.send(`Character ${args[0]} was removed`);
                }
            } else {
                message.channel.send(`Character ${args[0]} doesn't exist`);
            }
        }
    }
};