'use strict';

const fs = require('fs');

function writeLog(file, textMessageInTXT) {
	
	const logger = fs.createWriteStream(file, {flags: 'a' });
	logger.write(textMessageInTXT);
}

module.exports = writeLog;