const basePath = 'e:\\discord_bots\\MipCoinBot\\';
const command_option_prefix = '-';

module.exports = Object.freeze({
    //PATHS
    BASE_PATH: basePath,
    SERVER_COMMANDS_DIRECTORY_PATH: basePath + 'server_commands',
    PERSONAL_COMMANDS_DIRECTORY_PATH: basePath + 'personal_commands',
    GENERAL_COMMANDS_DIRECTORY_PATH: basePath + 'general_commands',
    UNHANDLED_CHANNELS_COMMANDS_DIRECTORY_PATH: basePath + 'unhandled_channels_commands',
    DATA_DIRECTORY_PATH: basePath + 'data',
    LOG_DIRECTORY_PATH: basePath + 'log',

    //CHANNELS TYPES
    CHANNELS_TYPES_DM: 'dm',
    CHANNELS_TYPES_TEXT: 'text',

    //AUTHORIZATION TYPES
    AUTHORIZATION_TYPE_ROLE: 'role',
    AUTHORIZATION_TYPE_SETTINGS: 'settings',

    //AUTHORIZATION SETTING
    AUTHORIZATION_SETTINGS_ROOT: 'root',

    //LOG
    SHOW_LOG_DEBUG: true,
    SHOW_LOG_ERROR: true,
    SHOW_LOG_START: true,
    SHOW_LOG_END: true,
    SHOW_LOG_LOAD: true,
    SHOW_LOG_INFO: true,

    LOG_DEBUG: 'DEBUG',
    LOG_ERROR: 'ERROR',
    LOG_START: 'START',
    LOG_END: 'END',
    LOG_LOAD: 'LOAD',
    LOG_INFO: 'INFO',

    LOG_SPLIT: '-------------------------------',

    //ERORRS
    SHOW_ERORR_404: true,
    MESSAGE_ERROR_404: 'Error 404: Function doesn\'t exist',

    //COMMANDS OPTIONS
    COMMAND_OPTION_PREFIX: command_option_prefix,
    COMMAND_OPTION_DONT_CHANGE: command_option_prefix + "dc",
    COMMAND_OPTION_DONT_CHANGE_DESCRIPTION: "Don't change the current value.",
    COMMAND_OPTION_ADD: command_option_prefix + "a",
    COMMAND_OPTION_ADD_DESCRIPTION: "To add and not overwrite.",
    COMMAND_OPTION_ALL: command_option_prefix + "all",
    COMMAND_OPTION_ALL_DESCRIPTION: "All of the quntatiy.",

    // ARGUMENTS
    START_CHAR_LONG_ARGUMENT: '[',
    END_CHAR_LONG_ARGUMENT: ']',

    // MESSAGE FLAGS
    START_CHAR_ROLE: '[',
    END_CHAR_ROLE: ']',
    START_CHAR_CHANNEL: '<',
    END_CHAR_CHANNEL: '>',
    START_CHAR_MEMBER_NAME: '{',
    END_CHAR_MEMBER_NAME: '}',

    // YES/NO
    YES: 'yes',
    NO: 'no',

    STARTING_MONEY: 100
});