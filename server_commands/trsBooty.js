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
        '[ amount]' +
        '\n' +
        '[Character name 2]' +
        '\n\n' +
        '__Argument__' +
        '\n' +
        '`[Character name 1]` - AAAAA' +
        '\n' +
        '`[Transfer amount]` - AAAAA' +
        '\n' +
        '`[Character name 2]` - AAAAA',
    args: true,
    execute(client, message, args) {
        if (args.length !== 3) {
            return;
        } else {
            if (!Number.isInteger(parseFloat(args[1]))) {
                return;
            }

            const moneyManager = require('money_manager');
            const moneyMan = new moneyManager();

            if (!moneyMan.character_exists(args[0])) {
                return;
            }

            if (!moneyMan.character_exists(args[2])) {
                return;
            }

            const character1Name = args[0];
            const moneyTrs = args[1];
            const character2Name = args[2];

            const character1Data = moneyMan.get(character1Name);

            if (character1Data.money < moneyTrs) { //character1 doesn't have enough money
                return;
            }

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
                    return character2Data.owner === username;
                } else if (character2Approves) {
                    return character1Data.owner === username;
                } else {
                    return false;
                }
            };

            const runTime = 30 * 1000;
            message.channel.awaitMessages(filter, { time: runTime, max: 2, errors: ['time'] })
                .then(messages => {
                    message.channel.send(`You've entered: ${messages.first().content}`);
                })
                .catch((error) => {
                    console.log(error);
                    message.channel.send('Transfer canceled.');
                });
        }
    },
};