'use strict';

const binance = require('../connectToExchange');
const initData = require('../../config/initData');

const getPriceNow = () => {
	return new Promise((resolve, reject) => {
		binance.bookTickers(initData.pair, (error, ticker) => {
			ticker ? resolve(+ticker.bidPrice) : reject(error);
		});
	});
};

module.exports = getPriceNow;
