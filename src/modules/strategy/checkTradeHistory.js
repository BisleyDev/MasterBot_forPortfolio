'use strict';

const { firstCoin } = require('../config/initData');

function checkTradeHistory(tradeHistory) {
	const ordersAmount = tradeHistory.length - 1;
	let summCoinsBeforeOrders = null;
	summCoinsBeforeOrders = ordersAmount >= 0 ? +tradeHistory[0].qty : 0;

	for (
		let i = 1;
		i <= ordersAmount &&
		tradeHistory[i].isBuyer === tradeHistory[i - 1].isBuyer;
		i++
	) {
		summCoinsBeforeOrders += +tradeHistory[i].qty;
	}
	console.info(`summCoins ${firstCoin}:  ${summCoinsBeforeOrders.toFixed(4)}`);
	return summCoinsBeforeOrders;
}
module.exports = checkTradeHistory;
