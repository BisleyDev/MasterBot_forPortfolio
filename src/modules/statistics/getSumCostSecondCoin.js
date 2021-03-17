'use strict';

const checkTradeHistory = require('../strategy/checkTradeHistory');
const getPriceNow = require('../workWithExchange/getDataFromServer/getPriceNow');
const lastOrdersEquivBTC = require('./lastOrdersEquivBTC');

async function getSumCostSecondCoin(allOrdersComplite) {
	const price = await getPriceNow();
	console.log('price', price);
	let sumOrdersBuy = 0;
	let sumOrdersSell = 0;

	for (let i = 0; i < allOrdersComplite.length; i++) {
		let currentOrder = allOrdersComplite[i];
		let value = +currentOrder.qty * +currentOrder.price;
		currentOrder.isBuyer ? (sumOrdersBuy += value) : (sumOrdersSell += value);
	}

	const lastOrdersInBTC = lastOrdersEquivBTC(allOrdersComplite);
	console.log('lastOrdersInBTC', lastOrdersInBTC);

	allOrdersComplite[0].isBuyer
		? (sumOrdersBuy -= lastOrdersInBTC)
		: (sumOrdersSell -= lastOrdersInBTC);
	const total = allOrdersComplite[allOrdersComplite.length - 1].isBuyer
		? getPersent(sumOrdersSell, sumOrdersBuy)
		: getPersent(sumOrdersBuy, sumOrdersSell);

	console.log('All close position:' + total + '%');

	const currentOpenPosition = checkTradeHistory(allOrdersComplite);
	const currentOpenPositionEquivBTC = +currentOpenPosition * +price;
	const delayBetweenAndNow = allOrdersComplite[0].isBuyer
		? getPersent(currentOpenPositionEquivBTC, lastOrdersInBTC)
		: getPersent(lastOrdersInBTC, currentOpenPositionEquivBTC);

	console.log(`Current order: \n
   date open: ${new Date(allOrdersComplite[0].time)}\n
   price open: ${allOrdersComplite[0].price} \n
   value now in %: ${delayBetweenAndNow}`);
}
module.exports = getSumCostSecondCoin;

function getPersent(bigNum, littleNum) {
	return (((bigNum - littleNum) / ((bigNum + littleNum) / 2)) * 100).toFixed(
		2
	);
}
