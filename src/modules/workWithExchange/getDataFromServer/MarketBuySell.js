'use strict';

const binance = require('../connectToExchange');
const { pair } = require('../../config/initData');
const sendInTelegram = require('../../utils/sendInTelegram');
const writeLog = require('../../utils/writeLog');
const getPriceNow = require('./getPriceNow');

const buy = async (quantity, text) => {
	try {
		const price = getPriceNow();
		console.log(quantity, text);
		return new Promise(() => {
			binance.marketBuy(pair, quantity);
			console.log('🚀 result Buy', result);
			const message = `\n ${new Date().toLocaleString()} \n Buy ${text}: ${pair} \n Quantity: ${quantity} \n	Price: ${price}`;
			sendInTelegram(message);
			writeLog('log.txt', message);
		});

		// const result = await binance.marketBuy(pair, quantity);
		// console.log('🚀 result Buy', result);
		// const message = `\n ${new Date().toLocaleString()} \n Buy ${text}: ${pair} \n Quantity: ${quantity} \n	Price: ${
		// 	result.fills[0].price
		// }`;
		// sendInTelegram(message);
		// writeLog('log.txt', message);
	} catch (e) {
		console.log('Error in function "MarketBuySell - buy ');

		writeLog(
			'error.txt',
			'\n ${new Date().toLocaleString()}  \n Error in function "MarketBuySell - buy" \n'
		);
		setTimeout(() => {
			buy(quantity, text);
		}, 10000);
	}
};

const sell = async (quantity, text) => {
	try {
		const price = getPriceNow();
		console.log(quantity, text);
		return new Promise(() => {
			binance.marketSell(pair, quantity);
			console.log('🚀 result Sell', result);
			const message = `Sell ${text}: ${pair} \n Quantity: ${quantity} \n	Price: ${price}`;
			sendInTelegram(message);
			writeLog('log.txt', message);
		});

		// console.log('🚀 result Sell', result);
		// const message = `Sell ${text}: ${pair} \n Quantity: ${quantity} \n	Price: ${result.fills[0].price}`;
		// sendInTelegram(message);
		// writeLog('log.txt', message);
	} catch (e) {
		console.log('Error in function "MarketBuySell - sell ');
		writeLog(
			'error.txt',
			`\n ${new Date().toLocaleString()} \n Error in function "MarketBuySell - sell"\n`
		);
		setTimeout(() => {
			sell(quantity, text);
		}, 10000);
	}
};

module.exports = { buy, sell };
