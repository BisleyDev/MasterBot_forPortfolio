'use scrict';

const myAPI = require('../config/apiKey');
const Binance = require('node-binance-api');

const binance = new Binance().options({
	APIKEY: myAPI.KEY,
	APISECRET: myAPI.SECRET,
	useServerTime: true,
	recvWindow: 5000, // Set a higher recvWindow to increase response timeout
	verbose: true, // Add extra output when subscribing to WebSockets, etc
	log: (log) => {
		console.log(log); // You can create your own logger here, or disable console output
	},
});

module.exports = binance;
