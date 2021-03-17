'use strict';

function lastOrdersEquivBTC(tradeHistory) {
	const ordersAmount = tradeHistory.length - 1;
	let summCoinsBeforeOrders = 0;

	for (
		let i = 0;
		i <= ordersAmount &&
		tradeHistory[0].isBuyer === tradeHistory[i + 1].isBuyer;
		i++
	) {
		summCoinsBeforeOrders += +tradeHistory[i].qty * +tradeHistory[i].price;
	}
	return summCoinsBeforeOrders;
}

module.exports = lastOrdersEquivBTC;
