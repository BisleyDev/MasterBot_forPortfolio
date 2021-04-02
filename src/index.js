'use strict';

const getHistoryCandles = require('./modules/workWithExchange/getDataFromServer/getHistoryCandles');
const getValueCandles = require('./modules/strategy/splitPricesCandles');
const indicatorMACD = require('./modules/talibIndicators/indicator_MACD');
const checkSignalIndicatorMACD = require('./modules/strategy/checkIndicatorMACD');
const placeOrder = require('./modules/strategy/placeOrder');
const timeFirstStart = require('./modules/utils/timeFirstStart');
const {
	intervalCandles,
	checkWaveTheory,
	pair,
} = require('./modules/config/initData');
const writeLog = require('./modules/utils/writeLog');
const sendInTelegram = require('./modules/utils/sendInTelegram');
const checkDivergence = require('./modules/strategy/checkDivergence');
const waveTheory = require('./modules/strategy/waveTheory');

async function mainCycle() {
	console.info(new Date().toLocaleString());
	try {
		const HistoryCandles = await getHistoryCandles(intervalCandles);
		const valueCandles = getValueCandles(HistoryCandles);
		const valuesIndicatorMACD = indicatorMACD(valueCandles.close);
		const signalIndicatorMACD = checkSignalIndicatorMACD(valuesIndicatorMACD);
		signalIndicatorMACD
			? await placeOrder(
					signalIndicatorMACD,
					checkDivergence(valuesIndicatorMACD, valueCandles)
			  )
			: null;

		console.log('Wait next cycle... \n __________________________');
		setTimeout(() => {
			mainCycle();
		}, timeFirstStart(intervalCandles, 30));
	} catch (e) {
		console.error(`Error!!!!  \n ${e}`, pair);
		writeLog(
			'log.txt',
			`${new Date().toLocaleString()} Error!!!!  \n ${e} in function mainCycle`
		);

		setTimeout(() => {
			console.log('timeOut main');
			mainCycle();
		}, 15000);
	}
}

setTimeout(() => {
	waveTheory;
	mainCycle();
}, timeFirstStart(intervalCandles, 30));

setTimeout(() => {
	waveTheory();
}, timeFirstStart(checkWaveTheory, 15));
