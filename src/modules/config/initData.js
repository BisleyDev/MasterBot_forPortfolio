'use strict';

const initData = {
	//
	firstCoin: 'BNB',
	secondCoin: 'ETH',
	intervalCandles: '5m',
	quantityCandles: 500,
	// Parameters indicator MACD
	minLimitSignalMACD: 0.0002,
	fastPeriodMACD: 24,
	slowPeriodMACD: 52,

	interestRate: 0.3,
	roundRate: 4,

	checkWaveTheory: '30m',
};

initData.pair = initData.firstCoin + initData.secondCoin;

module.exports = initData;
