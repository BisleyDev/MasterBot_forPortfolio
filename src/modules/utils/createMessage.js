'use strict';

const { roundRate } = require('../config/initData');

function createMessage(results, initData) {
	const totalFirstCoin = results.qCoin1 + results.aCoin1;
	const totalSecondCoin = results.qCoin2 + results.aCoin2;
	const IncomeFirstCoin =
		((totalFirstCoin - initData.testValueFirstCoinOnWallet) * 100) /
		initData.testValueFirstCoinOnWallet;
	const IncomeSecondCoin =
		((totalSecondCoin - initData.testValueSecondCoinOnWallet) * 100) /
		initData.testValueSecondCoinOnWallet;
	let result =
		'Interest income: ' +
		(IncomeFirstCoin + IncomeSecondCoin).toFixed(roundRate) +
		'%';
	const textMessage = `
	___________________________________ \n
	Test time: ${Date()} \n
	Test parameters initData: ${JSON.stringify(initData)} \n
	TotalResults coins: ${initData.firstCoin} ${totalFirstCoin.toFixed(5)} \n
	TotalResults coins: ${initData.secondCoin} ${totalSecondCoin.toFixed(5)} \n
	${result} \n
	___________________________________ \n
	`;

	return textMessage;
}

module.exports = createMessage;
