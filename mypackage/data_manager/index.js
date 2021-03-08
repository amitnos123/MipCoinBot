const constants = require('../consts');

module.exports = class data_manager {

    /**
     * Constructor data_loader object
     * @constructor
     */
    constructor(fileName) {
        this.dataDir = constants.DATA_DIRECTORY_PATH;
        if (fileName !== undefined && fileName !== null) {
            this.fileName = fileName;
        }
    }

    /**
     * Return the data from the file, without using the cache.
     * @param {string} fileName - The name of the file which hold the data.
     * @returns {object\JSON} - The data
     */
    load_data(fileName) {
        if (fileName === undefined || fileName === null) {
            fileName = this.fileName;
        }

        const filePath = this.dataDir + '/' + fileName;

        const fs = require('fs');

		if (!fs.existsSync(filePath)) { //file doesn't exists
			return {};
		}
		
        let readData = '';
        readData = fs.readFileSync(filePath, "utf8");

        if (readData === '') {
            return {};
        } else {
            const returnData = JSON.parse(readData);
            return returnData;
        }
    }

    /**
     * Return the data from the file, without using the cache.
     * @param {object\JSON} data - The data which will be saved to the file.
     * @param {string} fileName - The name of the file which hold the data. Not Required, if constructed with with fileName
     * @returns {void} - The data
     */
    save_data(data, fileName) {
        if (fileName === undefined || fileName === null) {
            fileName = this.fileName;
        }

        const fs = require('fs');
        const filePath = this.dataDir + '\\' + fileName;

        const jsonStringData = JSON.stringify(data);

        fs.writeFileSync(filePath, jsonStringData);
    }
};
