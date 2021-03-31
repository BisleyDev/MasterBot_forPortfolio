'use strict';

const {
	interestRate,
	firstCoin,
	secondCoin,
	roundRate,
} = require('../config/initData');
const getBalance = require('../../modules/workWithExchange/getDataFromServer/getBalanceCoin');
const getPrice = require('../workWithExchange/getDataFromServer/getPriceNow');
const checkTradeHistory = require('./checkTradeHistory');
const {
	buy,
	sell,
} = require('../workWithExchange/getDataFromServer/MarketBuySell');
const getLastCompliteTrades = require('./getLastCompliteTrade');
const isMoreThenMinOrderSize = require('./isMoreThenMinOrderSize.js');
const writeLog = require('../utils/writeLog');

async function placeOrder(signal, isDivergence) {
	try {
		let quantity = 0;
		const price = await getPrice();
		const tradesHistory = await getLastCompliteTrades();
		const summCoinsBeforeOrders = tradesHistory
			? checkTradeHistory(tradesHistory)
			: 0;
		const valueLastOrder = tradesHistory ? tradesHistory[0].qty : 0;
		const isBuyerBeforeOrders = tradesHistory
			? tradesHistory[0].isBuyer
			: null;

		if (signal === 'short') {
			console.log('short', price);
			if (summCoinsBeforeOrders && isBuyerBeforeOrders) {
				quantity = +summCoinsBeforeOrders.toFixed(roundRate);
				await sell(quantity, 'active Founds');
			} else if (summCoinsBeforeOrders && !isBuyerBeforeOrders) {
				quantity = isDivergence
					? +(valueLastOrder * 1.5).toFixed(roundRate)
					: +(valueLastOrder * 1.15).toFixed(roundRate);
				const quantityFirstCoinInWallet = +(await getBalance(firstCoin));
				if (
					quantityFirstCoinInWallet < quantity &&
					isMoreThenMinOrderSize(quantity, price)
				) {
					quantity = quantityFirstCoinInWallet;
				} else if (!isMoreThenMinOrderSize(quantity, price)) {
					return;
				}
				await sell(quantity, 'new deal');
				return;
			}
			const quantityCoinInWallet = +(await getBalance(firstCoin));
			quantity = +(quantityCoinInWallet * interestRate).toFixed(roundRate);
			sell(quantity, 'new trend');
		}
		if (signal === 'long') {
			console.log('long', price);
			if (summCoinsBeforeOrders && !isBuyerBeforeOrders) {
				quantity = +summCoinsBeforeOrders.toFixed(roundRate);
				await buy(quantity, 'active Founds');
			} else if (summCoinsBeforeOrders && isBuyerBeforeOrders) {
				quantity = isDivergence
					? +(valueLastOrder * 1.5).toFixed(roundRate)
					: +(valueLastOrder * 1.15).toFixed(roundRate);
				const quantitySecondCoinInWallet = +(await getBalance(secondCoin));
				if (
					quantitySecondCoinInWallet / price < quantity &&
					isMoreThenMinOrderSize(quantity, price)
				) {
					quantity = quantityFirstCoinInWallet;
				} else if (!isMoreThenMinOrderSize(quantity, price)) {
					return;
				}
				await buy(quantity, 'new deal');
				return;
			}
			const quantityCoinInWallet = +(await getBalance(firstCoin));
			quantity = +(quantityCoinInWallet * interestRate).toFixed(roundRate);
			buy(quantity, 'new trend');
		}
	} catch (e) {
		console.log('error function PlaceOrder');
		writeLog(
			'error.txt',
			`${new Date().toLocaleString()}  \n Error function PlaceOrder \n`
		);

		setTimeout(() => {
			console.log('timeOut placeOrder function');
			placeOrder(signal, isDivergence);
		}, 15000);
	}
}
module.exports = placeOrder;
