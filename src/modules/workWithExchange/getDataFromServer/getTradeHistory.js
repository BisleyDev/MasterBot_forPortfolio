'use strict';

const binance = require('../connectToExchange');
const initData = require('../../config/initData');

const getTradeHistory = () => {
	return new Promise((resolve, reject) => {
		binance.trades(initData.pair, (error, trades, symbol) => {
			trades ? resolve(trades) : reject(error);
		});
	});
};

module.exports = getTradeHistory;
