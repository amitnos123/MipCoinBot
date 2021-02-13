const path = require('path');
const constants = require('consts');
const log_writer = require('log_writer');
const lw = new log_writer(constants.LOG_DIRECTORY_PATH);
module.exports = {
    name: path.basename(__filename).split('.').slice(0, -1).join('.'),
    description: 'Character 1 transfers an amount of money to character 2.',
    help: '__Input__' +
        '\n' +
        '[Character name 1]' +
        '\n' +
        '[Transfer amount]' +
        '\n' +
        '[Character name 2]' +
        '\n\n' +
        '__Argument__' +
        '\n' +
        '`[Character name 1]` - Character\'s name which will give the money' +
        '\n' +
        '`[Transfer amount]` - The amount of money which is transfered' +
        '\n' +
        '`[Character name 2]` - Character\'s name which will get the money',
    args: true,
    execute(client, message, args) {
        if (args.length !== 3) { // Number of arguments that is expect
            return;
        } else {
            if (!Number.isInteger(parseFloat(args[1]))) {
                message.channel.send('Transfer amount isn\'t a interger.');
                return;
            }

            const moneyManager = require('money_manager');
            const moneyMan = new moneyManager();

            // Validation of arguments

            if (!moneyMan.character_exists(args[0])) {
                message.channel.send(`Character ${args[0]} doesn't exist.`);
                return;
            }

            if (!moneyMan.character_exists(args[2])) {
                message.channel.send(`Character ${args[2]} doesn't exist.`);
                return;
            }

            const character1Name = args[0];
            const moneyTrs = args[1];
            const character2Name = args[2];

            const character1Data = moneyMan.get(character1Name);

            if (character1Data.money < moneyTrs) { //character1 doesn't have enough money
                message.channel.send(`Character ${args[0]} doesn't have enought money to transfer.`);
                return;
            }

            // Validate that at least one of the characters belongs to the use which called the command

            const character2Data = moneyMan.get(character2Name);

            let character1Approves = false;
            let character2Approves = false;

            const authorUsername = message.author.username;
            switch (authorUsername) {
                case character1Data.owner:
                    character1Approves = true;
                    message.channel.send(`Does ${character2Name} agree to the transfer?`);
                    break;
                case character2Data.owner:
                    character2Approves = true;
                    message.channel.send(`Does ${character1Name} agree to the transfer?`);
                    break;
                default: // If character don't belong to the command caller, stop
                    return;
            }

            const filter = function (newMessage) {
                if (newMessage.author.bot) {
                    return false;
                }

                if (constants.YES !== newMessage.content && constants.NO !== newMessage.content) {
                    return false;
                }

                const username = newMessage.author.username;

                if (character1Approves) {
                    if (character2Data.owner === username) {
                        return true;
                    } else {
                        return false;
                    }
                } else if (character2Approves) {
                    if (character1Data.owner === username) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            };

            const runTime = 7 * 24 * 60 * 60 * 1000;
            message.channel.awaitMessages(filter, { time: runTime, max: 2, errors: ['time'] })
                .then(messages => {
                    switch (messages.first().content) {
                        case constants.YES:
                            moneyMan.character_update(character1Name, parseFloat(character1Data.money) - parseFloat(moneyTrs));
                            moneyMan.character_update(character2Name, parseFloat(character2Data.money) + parseFloat(moneyTrs));
                            message.channel.send('Transfer completed :+1:');
                            break;
                        case constants.NO:
                            message.channel.send('Transfer canceled :-1:');
                            break;
                    }
                })
                .catch((error) => {
                    lw.log_message('error', error);
                    message.channel.send('Transfer canceled.');
                });
        }
    },
};