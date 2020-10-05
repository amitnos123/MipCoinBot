const path = require('path');
const constants = require('consts');
const log_writer = require('log_writer');
const lw = new log_writer(constants.LOG_DIRECTORY_PATH);
module.exports = {
    name: path.basename(__filename).split('.').slice(0, -1).join('.'),
    description: 'The character\'s money',
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
                characterData = moneyMan.get(args[0]);
                message.channel.send('```diff\n' + `+ ${args[0]}: ${characterData.money}` + '```');
            } else {
                message.channel.send(`Character ${args[0]} doesn't exist`);
            }
        }
    }
};