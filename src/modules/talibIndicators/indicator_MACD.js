'use strict';

const talib = require('../../../node_modules/talib/build/Release/obj.target/talib');
const { fastPeriodMACD, slowPeriodMACD } = require('../config/initData');

function getValuesIndicatorMACD(valueCloseCandles) {
	let valuesIndicatorMACD = talib.execute({
		name: 'MACD',
		startIdx: 0,
		endIdx: valueCloseCandles.length - 1,
		inReal: valueCloseCandles,
		optInFastPeriod: fastPeriodMACD,
		optInSlowPeriod: slowPeriodMACD,
		optInSignalPeriod: 10,
	});
	return valuesIndicatorMACD.result;
}

module.exports = getValuesIndicatorMACD;
