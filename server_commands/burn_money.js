const path = require('path');
const constants = require('consts');
const log_writer = require('log_writer');
const lw = new log_writer(constants.LOG_DIRECTORY_PATH);
module.exports = {
    name: path.basename(__filename).split('.').slice(0, -1).join('.'),
    description: 'Burns(delete) the character\'s money for the given amount.',
    help: '__Input__' +
        '\n' +
        '[Character name]' +
        '\n' +
        '[Burn amount]' +
        '\n\n' +
        '__Argument__' +
        '\n' +
        '`[Character name]` - Character\'s name which the money belongs to' +
        '\n' +
        '`[Burn amount]` - The amount of money which is burned',
    args: true,
    execute(client, message, args) {
        if (args.length !== 2) { // Number of arguments that is expect
            return;
        } else {
            if (!Number.isInteger(parseFloat(args[1]))) {
                message.channel.send('Burn amount isn\'t a interger.');
                return;
            }

            const moneyManager = require('money_manager');
            const moneyMan = new moneyManager();

            // Validation of arguments

            if (!moneyMan.character_exists(args[0])) {
                message.channel.send(`Character ${args[0]} doesn't exist.`);
                return;
            }

            const characterName = args[0];
            const moneyBurn = args[1];

            const characterData = moneyMan.get(characterName);

            if (characterData.money < moneyBurn) { //character1 doesn't have enough money
                message.channel.send(`Character ${args[0]} doesn't have enought money to transfer.`);
                return;
            }

            // Validate that allowed to burn the money for that specific character 

            const authorizationCommandManager = require('authorization_command_manager');
            const authComManager = new authorizationCommandManager();

            const authorUsername = message.author.username;
            if (characterData.owner === authorUsername) { // Character belongs to the user calling the command
                lw.log_message('debug', `User ${authorUsername} (Character's owner) burned ${moneyBurn} money from character ${characterName}.`);
            } else if (authComManager.is_root(authorUsername)) { // Root user
                lw.log_message('debug', `User root ${authorUsername} burned ${moneyBurn} money from character ${characterName}.`);
            } else {
                lw.log_message('debug', `Username ${authorUsername} tried to burn money from character ${characterName}.`);
                return;
            }

            message.channel.send(`Confirm of burning ${moneyBurn} money from character ${characterName} (${constants.YES}\\${constants.NO})`);

            const filter = function (newMessage) {
                if (newMessage.author.bot) {
                    return false;
                }

                if (constants.YES !== newMessage.content && constants.NO !== newMessage.content) {
                    return false;
                }

                const username = newMessage.author.username;

                if (username === authorUsername) { // Same person that called the command
                    return true;
                }
                else {
                    return false;
                }
            };

            const runTime = 7 * 24 * 60 * 60 * 1000;
            message.channel.awaitMessages(filter, { time: runTime, max: 2, errors: ['time'] })
                .then(messages => {
                    console.log(messages.first().content);
                    switch (messages.first().content) {
                        case constants.YES:
                            moneyMan.character_update(characterName, parseFloat(characterData.money) - parseFloat(moneyBurn));
                            message.channel.send('Burning completed :+1:');
                            break;
                        case constants.NO:
                            message.channel.send('Burning canceled :-1:');
                            break;
                    }
                })
                .catch((error) => {
                    lw.log_message('error', error);
                    message.channel.send('Burning canceled.');
                });
        }
    },
};