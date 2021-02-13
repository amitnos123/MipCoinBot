const log_writer = require('../log_writer');
const constants = require('../consts');
const lw = new log_writer(constants.LOG_DIRECTORY_PATH);
const data_manager = require('../data_manager');

module.exports = class money_manager extends data_manager {

    /**
     * Constructor money_manager object
     * @constructor
    */
    constructor() {
        super('MONEY.json');
        this.moneyDataArr = this.load_data();
    }

    /**
     * Create a character
     * @param {string} characterName - The character's name.
     * @param {string} newOwner - The owner of the character
     * @param {int} newMoney - The amount of money the character starts
     * @returns {void}
     */
    character_create(characterName, newOwner, newMoney) {
        if (this.character_exists(characterName)) {
            const errorMessage = `Character for the characterName='${characterName}' already exist`;
            lw.log_message('error', errorMessage);
            throw new Error(errorMessage);
        }

        this.moneyDataArr[characterName] = {
            owner: newOwner,
            money: parseFloat(newMoney)
        };

        this.save_data(this.moneyDataArr);
    }

    /**
     * Update a amount of money the character
     * @param {string} characterName - The character's name.
     * @param {int} updatedMoney - The new amount of money the character has
     * @returns {void}
     */
    character_update(characterName, updatedMoney) {
        if (!this.character_exists(characterName)) {
            const errorMessage = `Character for the characterName='${characterName}' doesn't exist`;
            lw.log_message('error', errorMessage);
            throw new Error(errorMessage);
        }

        this.moneyDataArr[characterName].money = parseFloat(updatedMoney);

        this.save_data(this.moneyDataArr);
    }

    /**
     * Remove the character
     * @param {string} characterName - The character's name.
     * @returns {void}
     */
    character_remove(characterName) {
        if (this.moneyDataArr[characterName] === undefined) {
            const errorMessage = `Character for the characterName='${characterName}' doesn't exist`;
            lw.log_message('error', errorMessage);
            throw new Error(errorMessage);
        }

        delete this.moneyDataArr[characterName];

        this.save_data(this.moneyDataArr);
    }

    /**
     * If character with the name, exist
     * @param {string} characterName - The character's name.
     */
    character_exists(characterName) {
        if (this.moneyDataArr[characterName] === undefined) {
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
                return this.moneyDataArr[characterName];
            } else {
                return null;
            }
        } else {
            return this.moneyDataArr;
        }
    }
};