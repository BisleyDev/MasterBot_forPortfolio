'use strict';

const NodeFetch = require('node-fetch');
const myAPI = require('../config/apiKey');
const writeLog = require('./writeLog');

function sendMessage(message) {
	const url =
		'https://alarmerbot.ru/?key=' + myAPI.KEYTELEGRAM + '&message=' + message;
	const promise = NodeFetch(url);
	promise.catch((error) => {
		const message = `${Date()} \n No Internet!!! \n`;
		writeLog('log.txt', message);
	});
}

module.exports = sendMessage;
