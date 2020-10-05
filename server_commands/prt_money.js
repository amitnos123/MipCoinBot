const path = require('path');
const constants = require('consts');
const log_writer = require('log_writer');
const lw = new log_writer(constants.LOG_DIRECTORY_PATH);
module.exports = {
    name: path.basename(__filename).split('.').slice(0, -1).join('.'),
    description: 'Grante money to a character.',
    help: '__Input__' +
        '\n' +
        '[Character name]' +
        '\n' +
        '[Print amount]' +
        '\n\n' +
        '__Argument__' +
        '\n' +
        '`[Character name]` - Character\'s name which will be given the money' +
        '\n' +
        '`[Print amount]` - The amount of money which is given',
    args: true,
    execute(client, message, args) {
        if (args.length !== 2) {
            return;
        } else {

            const moneyManager = require('money_manager');
            const moneyMan = new moneyManager();

            const characterName = args[0];
            const moneyPrt = args[1];

            if (!Number.isInteger(parseFloat(moneyPrt))) {
                message.channel.send('Print amount isn\'t a interger.');
            }

            if (!moneyMan.character_exists(characterName)) {
                message.channel.send(`Character ${characterName} doesn't exist.`);
            }

            const characterData = moneyMan.get(characterName);

            moneyMan.character_update(characterName, parseFloat(characterData.money) + parseFloat(moneyPrt));

            message.channel.send('Money granted');
        }
    },
};