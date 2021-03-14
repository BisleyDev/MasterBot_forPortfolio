'use strict';

function timeFirstStart(intervalCandles, delaySeconds) {
	const timeOneCandleNum = parseFloat(intervalCandles);
	const MILISECONS_IN_ONE_MINUT = 1000 * 60;
	const MILISECONS_IN_ONE_HOUR = 1000 * 60 * 60;
	const MILISECONS_IN_ONE_DAY = 1000 * 60 * 60 * 24;
	const delayedStartScript = 1000 * delaySeconds;
	let timeSymbol = intervalCandles;
	timeSymbol = timeSymbol[timeSymbol.length - 1];

	const dateNow = new Date().getTime();
	let timeOneCandleMiliseconds;
	let timeFirstStart;
	switch (timeSymbol) {
		case 'm':
			timeOneCandleMiliseconds = MILISECONS_IN_ONE_MINUT * timeOneCandleNum;
			break;
		case 'h':
			timeOneCandleMiliseconds = MILISECONS_IN_ONE_HOUR * timeOneCandleNum;
			break;
		case 'd':
			timeOneCandleMiliseconds = MILISECONS_IN_ONE_DAY * timeOneCandleNum;
			break;
		default:
			console.info(
				'Время свечного интервала указанно неверно! Интервал в неделю и месяц не рассматривается.'
			);
	}

	timeFirstStart =
		(Math.floor(dateNow / timeOneCandleMiliseconds) + 1) *
			timeOneCandleMiliseconds +
		delayedStartScript -
		dateNow;
	// console.info(`Start search will be in ${timeFirstStart / 1000} seconds.`);
	return timeFirstStart;
}
module.exports = timeFirstStart;
