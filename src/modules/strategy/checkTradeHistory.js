'use strict';

const { firstCoin, roundRate } = require('../config/initData');

function checkTradeHistory(tradeHistory) {
	const ordersAmount = tradeHistory.length - 1;
	let summCoinsBeforeOrders = 0;

	for (
		let i = 0;
		i <= ordersAmount &&
		tradeHistory[0].isBuyer === tradeHistory[i + 1].isBuyer;
		i++
	) {
		summCoinsBeforeOrders += +tradeHistory[i].qty;
	}
	console.info(
		`summCoins ${firstCoin}:  ${summCoinsBeforeOrders.toFixed(roundRate)}`
	);
	return +summCoinsBeforeOrders.toFixed(roundRate);
}
module.exports = checkTradeHistory;
