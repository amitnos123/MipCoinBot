const path = require('path');
const constants = require('../mypackage/consts');
const log_writer = require('../mypackage/log_writer');
const lw = new log_writer(constants.LOG_DIRECTORY_PATH);
module.exports = {
    name: path.basename(__filename).split('.').slice(0, -1).join('.'),
    description: 'Append more text to bio a character\'s bio',
    help: '__Input__' +
        '\n' +
        '[character name]' +
        '\n' +
        '[Bio]' +
        '\n\n' +
        '__Argument__' +
        '\n' +
        '`[character name]` - Name of the character' +
        '\n' +
        '`[Bio addon]` - Can be any length that discord allows',
    args: true,
    execute(client, message, args) {
        if (args.length < 2) {
            return;
        } else {
            const bioManager = require('../mypackage/bios_manager');
            const bioMan = new bioManager();

            if (bioMan.character_exists(args[0])) {
                const authorizationCommandManager = require('../mypackage/authorization_command_manager');
                const authComManager = new authorizationCommandManager();
                if (bioMan.get(args[0]).owner === message.author.username || authComManager.is_root(message.author.username)) {
                    const firstSpaceIndex = message.content.indexOf(' ');
                    const secondSpaceIndex = message.content.indexOf(' ', (firstSpaceIndex + 1));
                    const newBio = message.content.substring(secondSpaceIndex + 1);
                    const char = bioMan.get(args[0]);

                    bioMan.character_update(args[0], char.bio + ' ' + newBio);
                    message.channel.send(`Character ${args[0]} bio was updated`);
                }
            } else {
                message.channel.send(`Character ${args[0]} doesn't exist`);
            }
        }
    }
};