'use strict';

const checkIndicatorMACD = require('./checkIndicatorMACD');
const sendInTelegram = require('../utils/sendInTelegram');

function checkDivergence(
	{ outMACD, outMACDSignal, outMACDHist },
	valueCandles
) {
	let isDivergence = false;
	let indexBeforeOrder;
	const slowValuesIndicMACD = outMACDSignal;

	const lengthArray = slowValuesIndicMACD.length - 1;

	const lastSlowValueIndMACD = slowValuesIndicMACD[lengthArray];

	if (lastSlowValueIndMACD < 0) {
		for (let i = lengthArray - 2; slowValuesIndicMACD[i] < 0; i--) {
			const newObjValue = {};
			newObjValue.outMACD = outMACD.slice(0, i);
			newObjValue.outMACDSignal = outMACDSignal.slice(0, i);
			newObjValue.outMACDHist = outMACDHist.slice(0, i);
			if (checkIndicatorMACD(newObjValue) === 'long') {
				indexBeforeOrder = i;
				isDivergence =
					newObjValue.outMACDSignal[i - 2] < lastSlowValueIndMACD &&
					valueCandles.open[i + 58] >
						valueCandles.open[valueCandles.open.length - 1]
						? true
						: false;
				break;
			}
		}
	}
	if (lastSlowValueIndMACD > 0) {
		for (let i = lengthArray - 2; slowValuesIndicMACD[i] > 0; i--) {
			const newObjValue = {};
			newObjValue.outMACD = outMACD.slice(0, i);
			newObjValue.outMACDSignal = outMACDSignal.slice(0, i);
			newObjValue.outMACDHist = outMACDHist.slice(0, i);
			if (checkIndicatorMACD(newObjValue) === 'short') {
				// console.log(i);
				// console.log(
				// 	newObjValue.outMACDSignal[i - 2],
				// 	lastSlowValueIndMACD,
				// 	valueCandles.open[i + 58],
				// 	valueCandles.open[valueCandles.open.length - 1]
				// );
				indexBeforeOrder = i;
				isDivergence =
					newObjValue.outMACDSignal[i - 2] > lastSlowValueIndMACD &&
					valueCandles.open[i + 58] <
						valueCandles.open[valueCandles.open.length - 1]
						? true
						: false;
				break;
			}
		}
	}
	if (isDivergence) {
		sendInTelegram(
			`Is divergence: \n 
			before time signal - ${new Date().toLocaleString()} \n 
			before price - ${valueCandles.open[indexBeforeOrder + 58]}`
		);
	}
	console.log(isDivergence);
	return isDivergence;
}

module.exports = checkDivergence;
