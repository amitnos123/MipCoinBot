const log_writer = require('../log_writer');
const constants = require('../consts');
const lw = new log_writer(constants.LOG_DIRECTORY_PATH);
const data_manager = require('../data_manager');

module.exports = class bio_manager extends data_manager {

    /**
     * Constructor characters_manager object
     * @constructor
    */
    constructor() {
        super('BIOS.json');
        this.charactersDataArr = this.load_data();
    }

    /**
     * Create a character
     * @param {string} characterName - The character's name.
     * @param {string} newOwner - The owner of the character
     * @param {string} newBio - The bio of the character
     * @returns {void}
     */
    character_create(characterName, newOwner, newBio) {
        if (this.character_exists(characterName)) {
            const errorMessage = `Character for the characterName='${characterName}' already exist`;
            lw.log_message('error', errorMessage);
            throw new Error(errorMessage);
        }

        this.charactersDataArr[characterName] = {
            owner: newOwner,
            bio: newBio
        };

        this.save_data(this.charactersDataArr);
    }

    /**
     * Update the character's bio
     * @param {string} characterName - The character's name.
     * @param {string} newBio - The new bio of the character
     * @returns {void}
     */
    character_update(characterName, newBio) {
        if (!this.character_exists(characterName)) {
            const errorMessage = `Character for the characterName='${characterName}' doesn't exist`;
            lw.log_message('error', errorMessage);
            throw new Error(errorMessage);
        }

        this.charactersDataArr[characterName].bio = newBio;

        this.save_data(this.charactersDataArr);
    }

    /**
     * Remove the character
     * @param {string} characterName - The character's name.
     * @returns {void}
     */
    character_remove(characterName) {
        if (this.charactersDataArr[characterName] === undefined) {
            const errorMessage = `Character for the characterName='${characterName}' doesn't exist`;
            lw.log_message('error', errorMessage);
            throw new Error(errorMessage);
        }

        delete this.charactersDataArr[characterName];

        this.save_data(this.charactersDataArr);
    }

    /**
     * If character with the name, exist
     * @param {string} characterName - The character's name.
     */
    character_exists(characterName) {
        if (this.charactersDataArr[characterName] === undefined) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * 
     * @param {string} characterName - The character's name. If not given, will return all
     */
    get(characterName) {
        if (characterName !== undefined) {
            if (this.character_exists(characterName)) {
                return this.charactersDataArr[characterName];
            } else {
                return null;
            }
        } else {
            return this.charactersDataArr;
        }
    }
};