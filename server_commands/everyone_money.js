const path = require('path');
const constants = require('../mypackage/consts');
const log_writer = require('../mypackage/log_writer');
const lw = new log_writer(constants.LOG_DIRECTORY_PATH);
module.exports = {
    name: path.basename(__filename).split('.').slice(0, -1).join('.'),
    description: 'A list of everyone\'s money',
    help: '__Input__' +
        '\n\n' +
        '__Argument__',
    args: true,
    execute(client, message, args) {
        if (args.length !== 0) {
            return;
        } else {
            const moneyManager = require('../mypackage/money_manager');
            const moneyMan = new moneyManager();

            let pluxMinusFlag = true;

            charactersArr = moneyMan.get();
            for (const characterName in charactersArr) {
                if (charactersArr.hasOwnProperty(characterName)) {
                    const characterData = charactersArr[characterName];
                    if (pluxMinusFlag) {
                        message.channel.send('```diff\n' + `+ ${characterName}: ${characterData.money}` + '```');
                        pluxMinusFlag = false;
                    } else {
                        message.channel.send('```diff\n' + `- ${characterName}: ${characterData.money}` + '```');
                        pluxMinusFlag = true;
                    }
                }
            }
        }
    },
};