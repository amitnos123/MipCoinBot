module.exports = class log_writer {

	/**
	 * Constructor log_writer object
	 * @constructor
	 * @param {string} logDir -The path to the directory which the log will be written in.
	 */
	constructor(logDir) {
		if (logDir === '') {
			throw new Error('log_writer didn\'t get log directory path');
		}
		this.logDir = logDir;
	}

	/**
	 * Write down the message in to the console and also into the file for the current date in a specific template
	 * @param {string} debugLvl  - What kind of log will it be
	 * @param {object} message - The object\string which will be logged
	 * @returns {void}
	 */
	log_message(debugLvl, message) {
		const constants = require('../consts');
		switch (debugLvl) {
			case 'debug':
				debugLvl = constants.LOG_DEBUG;
				break;
			case 'error':
				debugLvl = constants.LOG_ERROR;
				break;
			case 'start':
				debugLvl = constants.LOG_START;
				break;
			case 'end':
				debugLvl = constants.LOG_END;
				break;
			case 'load':
				debugLvl = constants.LOG_LOAD;
				break;
			default:
				debugLvl = constants.LOG_INFO;
				break;
		}

		const fs = require('fs');
		const path = require('path');

		const today = new Date();
		const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
		const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

		console.log(`[${date} ${time}]${debugLvl}:`, message);
		// fs.appendFileSync(`/${this.logDir}\\log-${date}.txt`, `[${time}]${debugLvl}:${JSON.stringify(message, undefined, 2)}\n`);
		fs.appendFileSync(`${this.logDir}\\mip.txt`, `[${time}]${debugLvl}:${JSON.stringify(message, undefined, 2)}\n`);

	}

	/**
	 * Write down in to the console and also into the file a specific string for splitting in the log
	 * @returns {void}
	 */
	log_split() {
		const fs = require('fs');
		const constants = require('../consts');

		const today = new Date();
		const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

		console.log(constants.LOG_SPLIT);
		fs.appendFileSync(`${this.logDir}/log-${date}.txt`, `${constants.LOG_SPLIT}\n`);
	}
};
