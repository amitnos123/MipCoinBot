const path = require('path');
const constants = require('../mypackage/consts');
const log_writer = require('../mypackage/log_writer');
const lw = new log_writer(constants.LOG_DIRECTORY_PATH);
module.exports = {
    name: path.basename(__filename).split('.').slice(0, -1).join('.'),
    description: 'Create a character\'s Bio',
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
            const bioManager = require('../mypackage/bios_manager');
            const bioMan = new bioManager();

            if (bioMan.character_exists(args[0])) {
                message.channel.send(`Character ${args[0]} already exists`);
            } else {
                bioMan.character_create(args[0], message.author.username, '');
                message.channel.send(`Character ${args[0]} created`);
            }
        }
    }
};