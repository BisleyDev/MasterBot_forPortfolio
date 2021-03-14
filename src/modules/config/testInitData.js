'use strict';

let initData = {
	firstCoin: 'ETC',
	secondCoin: 'BTC',
	intervalCandles: '5m',
	quantityCandles: 500,
	interestRate: 0.2,
	minLimitSignalMACD: 0.000002,
	fastPeriodMACD: 26,
	slowPeriodMACD: 52,

	testDayHistoryCandles: 30,
	testValueFirstCoinOnWallet: 16.5,
	testValueSecondCoinOnWallet: 0.0068,
};

initData.pair = initData.firstCoin + initData.secondCoin;

module.exports = initData;
