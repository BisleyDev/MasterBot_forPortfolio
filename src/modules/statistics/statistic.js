'use strict';

const { firstCoin, pair } = require('../config/initData');
const getLastCompliteTrade = require('../strategy/getLastCompliteTrade');
const getSumCostSecondCoin = require('./getSumCostSecondCoin');

async function getStatistic() {
	const allOrdersComplite = await getLastCompliteTrade();

	getSumCostSecondCoin(allOrdersComplite);
}

getStatistic();
module.exports = getStatistic;
