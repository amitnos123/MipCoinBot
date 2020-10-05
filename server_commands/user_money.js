const path = require('path');
const constants = require('consts');
const log_writer = require('log_writer');
const lw = new log_writer(constants.LOG_DIRECTORY_PATH);
module.exports = {
    name: path.basename(__filename).split('.').slice(0, -1).join('.'),
    description: 'A list of user\'s characters\' money',
    help: '__Input__' +
        '\n' +
        '[Username]' +
        '\n\n' +
        '__Argument__' +
        '\n' +
        '`[Username]` - AAAAA',
    args: true,
    execute(client, message, args) {
        if (args.length !== 1) {
            return;
        } else {
            let moneyList = '```diff\n';

            const moneyManager = require('money_manager');
            const moneyMan = new moneyManager();

            let pluxMinusFlag = true;

            charactersArr = moneyMan.get();
            for (const characterName in charactersArr) {
                if (charactersArr.hasOwnProperty(characterName)) {
                    const characterData = charactersArr[characterName];
                    if (characterData.owner === args[0]) {
                        if (pluxMinusFlag) {
                            moneyList += '+ ';
                            pluxMinusFlag = false;
                        } else {
                            moneyList += '- ';
                            pluxMinusFlag = true;
                        }
                        moneyList += `${characterName}: ${characterData.money}\n`;
                    }
                }
            }

            message.channel.send(moneyList + '```');
        }
    },
};