const writeLog = require('../utils/writeLog');
const getTradeHistory = require('../workWithExchange/getDataFromServer/getTradeHistory');

async function getLastCompliteTrade() {
	try {
		let tradeHistoryWithServer = await getTradeHistory();
		if (!tradeHistoryWithServer.length) {
			return 0;
		}
		let tradeHistory = [tradeHistoryWithServer[0]];
		for (let i = 1; i < tradeHistoryWithServer.length; i++) {
			if (
				tradeHistory[tradeHistory.length - 1].orderId ===
				tradeHistoryWithServer[i].orderId
			) {
				let unitedOrder = tradeHistoryWithServer[i];
				unitedOrder.qty = (
					+tradeHistory[tradeHistory.length - 1].qty +
					+tradeHistoryWithServer[i].qty
				).toString();
				tradeHistory.pop();
				tradeHistory.push(unitedOrder);
			} else {
				tradeHistory.push(tradeHistoryWithServer[i]);
			}
		}
		tradeHistory.reverse();
		return tradeHistory;
	} catch (error) {
		writeLog(
			'error.txt',
			`${new Date().toLocaleString()}  Error in function "getLastCompliteTrade"\n`
		);
	}
}

module.exports = getLastCompliteTrade;
