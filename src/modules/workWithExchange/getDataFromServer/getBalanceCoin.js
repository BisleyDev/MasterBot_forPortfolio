'use strict';

const binance = require('../connectToExchange');

const getBalanceCoin = (coin) => {
	return new Promise((resolve, reject) => {
		binance.balance((error, balances) => {
			const balanceOneCoin = balances[coin];
			balanceOneCoin && balanceOneCoin.available.length
				? resolve(balanceOneCoin.available)
				: reject(error);
		});
	});
};

module.exports = getBalanceCoin;
