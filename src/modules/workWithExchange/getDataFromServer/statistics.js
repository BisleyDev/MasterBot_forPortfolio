'use strict';

const getTradeHistory = require('./getTradeHistory');

async function getStatisticsForDay() {
	const historyOrders = await getTradeHistory();
	console.log(
		'🚀 ~ file: statistics.js ~ line 7 ~ getStatisticsForDay ~ historyOrders',
		historyOrders
	);
}

getStatisticsForDay();
