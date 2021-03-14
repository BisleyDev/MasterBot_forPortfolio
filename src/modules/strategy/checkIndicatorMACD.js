'use strict';

const initData = require('../config/initData');

const upperLimitMACD = initData.minLimitSignalMACD;
const lowerLimitMACD = -upperLimitMACD;

function checkSignalIndicatorMACD(valuesIndicatorMACD) {
	const fastValue = valuesIndicatorMACD.outMACD;
	const slowValue = valuesIndicatorMACD.outMACDSignal;
	let i = fastValue.length - 2;

	if (
		fastValue[i - 1] > upperLimitMACD &&
		// slowValue[i - 1] > upperLimitMACD &&
		fastValue[i - 1] > slowValue[i - 1] &&
		fastValue[i] < slowValue[i]
	) {
		return 'short';
	} else if (
		// slowValue[i - 1] < lowerLimitMACD &&
		fastValue[i - 1] < lowerLimitMACD &&
		fastValue[i - 1] < slowValue[i - 1] &&
		fastValue[i] > slowValue[i]
	) {
		return 'long';
	}
}

module.exports = checkSignalIndicatorMACD;
