'use strict';

function delayAfterRejected(func) {
	console.log('setTimeout');
	return new Promise(() => {
		setTimeout(() => {
			func();
		}, 10000);
	});
}

module.exports = delayAfterRejected;
