'use strict';

const binance = require('../connectToExchange');
const { pair, quantityCandles } = require('../../config/initData');

const getHistoryCandles = async (intervalCandles) => {
	return new Promise((resolve, reject) =>
		binance.candlesticks(
			pair,
			intervalCandles,
			(error, ticks, symbol) => {
				ticks.length > 0 ? resolve(ticks) : reject(error);
			},
			{ limit: quantityCandles, endTime: new Date().getTime() }
		)
	);
};

module.exports = getHistoryCandles;
