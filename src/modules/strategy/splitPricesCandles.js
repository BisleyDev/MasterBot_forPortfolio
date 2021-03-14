'use strict';

function splitPricesCandles(array) {
	const valueCandles = {
		date: [],
		open: [],
		high: [],
		low: [],
		close: [],
		volume: [],
	};
	array.forEach(([date, open, high, low, close, volume]) => {
		valueCandles.date.push(date);
		valueCandles.open.push(+open);
		valueCandles.high.push(+high);
		valueCandles.low.push(+low);
		valueCandles.close.push(+close);
		valueCandles.volume.push(+volume);
	});
	return valueCandles;
}

module.exports = splitPricesCandles;
