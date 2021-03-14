'use strict';

const {
	firstCoin,
	interestRate,
	roundRate,
	checkWaveTheory,
	pair,
} = require('../config/initData');
const {
	sell,
	buy,
} = require('../workWithExchange/getDataFromServer/MarketBuySell');
const checkTradeHistory = require('./checkTradeHistory');
const getLastCompliteTrade = require('./getLastCompliteTrade');
const getHistoryCandles = require('../workWithExchange/getDataFromServer/getHistoryCandles');
const getValueCandles = require('../strategy/splitPricesCandles');
const indicatorMACD = require('../talibIndicators/indicator_MACD');
const timeFirstStart = require('../utils/timeFirstStart');
const writeLog = require('../utils/writeLog');
const getExtremInWaveGistogram = require('./getExtremInWaveGistogram');
const getBalance = require('../workWithExchange/getDataFromServer/getBalanceCoin');

// valuesIndicatorMACD.outMACD - fast line
// valuesIndicatorMACD.outMACDSignal - slow line
// valuesIndicatorMACD.outMACDHist - gistogram

async function waveTheory() {
	console.info(new Date().toLocaleString());
	console.log('Start check wave theory');
	try {
		const tradeHistory = await getLastCompliteTrade();

		if (!tradeHistory[0]) {
			setTimeout(() => {
				waveTheory();
			}, timeFirstStart(checkWaveTheory, 15));
			return;
		}

		const lastOrder = tradeHistory[0];
		let rate = +checkTradeHistory(tradeHistory);
		const isOneTimeOrdersComplite =
			tradeHistory[0].time - tradeHistory[1].time < 5 * 60 * 1000;

		const lastOrderIsBuyer = lastOrder.isBuyer;
		const lastOrderRate = +(+lastOrder.qty).toFixed(roundRate);

		if (rate > lastOrderRate && !isOneTimeOrdersComplite) {
			const HistoryCandles = await getHistoryCandles(checkWaveTheory);
			const valueCandles = getValueCandles(HistoryCandles);
			const valuesIndicatorMACD = indicatorMACD(valueCandles.close);
			let gistogram = valuesIndicatorMACD.outMACDHist;
			// gistogram = gistogram.slice(0, gistogram.length - 34);

			const currentGistogram = gistogram[gistogram.length - 2];
			const extremInWaveGistogram = getExtremInWaveGistogram(gistogram);
			const minValueForSignal = extremInWaveGistogram * 0.5;

			if (
				lastOrderIsBuyer &&
				currentGistogram > 0 &&
				currentGistogram < minValueForSignal
			) {
				await sell(rate, 'end full cycle');
				const quantityCoinInWallet = +(await getBalance(firstCoin));
				rate = +(quantityCoinInWallet * interestRate).toFixed(roundRate);
				await sell(+rate, 'new trend after wave theory');
			} else if (
				!lastOrderIsBuyer &&
				currentGistogram < 0 &&
				currentGistogram > minValueForSignal
			) {
				await buy(rate, 'end full cycle');
				const quantityCoinInWallet = +(await getBalance(firstCoin));
				rate = +(quantityCoinInWallet * interestRate).toFixed(roundRate);
				await buy(+rate, 'new trend after wave theory');
			}
		}
		setTimeout(() => {
			waveTheory();
		}, timeFirstStart(checkWaveTheory, 15));
	} catch (e) {
		console.error(`Error!!!! in file waveTheory \n ${e}`, pair);
		writeLog(
			'log.txt',
			`\n ${new Date().toLocaleString()} Error!!!!  \n ${e} in function waveTheory`
		);

		setTimeout(() => {
			console.log('timeOut waveTheory');
			waveTheory();
		}, 15000);
	}
}
module.exports = waveTheory;

// const Sell = {
// 	symbol: 'LTCBTC',
// 	orderId: 574466820,
// 	orderListId: -1,
// 	clientOrderId: 'ifaeVcUU4M4XzzTGtwY96t',
// 	transactTime: 1614790832280,
// 	price: '0.00000000',
// 	origQty: '1.46000000',
// 	executedQty: '1.46000000',
// 	cummulativeQuoteQty: '0.00547500',
// 	status: 'FILLED',
// 	timeInForce: 'GTC',
// 	type: 'MARKET',
// 	side: 'SELL',
// 	fills: [
// 		{
// 			price: '0.00375000',
// 			qty: '1.46000000',
// 			commission: '0.00000548',
// 			commissionAsset: 'BTC',
// 			tradeId: 55971230,
// 		},
// 	],
// };
// console.log(Sell.fills[0].price);
