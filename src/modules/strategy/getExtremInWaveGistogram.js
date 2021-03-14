'use strict';

function getExtremInWaveGistogram(gistogram) {
	const gistogramLength = gistogram.length - 2;
	const currentGistogramValue = gistogram[gistogramLength];
	const isPositiveValue = currentGistogramValue > 0;

	let max = gistogram[gistogramLength];

	if (isPositiveValue) {
		for (let i = gistogramLength; gistogram[i] > 0; i--) {
			max = max < gistogram[i] ? gistogram[i] : max;
		}
	} else {
		for (let i = gistogramLength; gistogram[i] < 0; i--) {
			max = max > gistogram[i] ? gistogram[i] : max;
		}
	}

	return max;
}

module.exports = getExtremInWaveGistogram;
