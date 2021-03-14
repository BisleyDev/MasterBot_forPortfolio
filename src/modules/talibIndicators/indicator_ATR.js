'use strict';

const talib = require('../../../node_modules/talib/build/Release/obj.target/talib');


// function getValuesIndicatorATR(valueCloseCandles) {
//     let valuesIndicatorMACD = talib.execute({
//         name: "MACD",
//         startIdx: 0,
//         endIdx: valueCloseCandles.length - 1,
//         inReal: valueCloseCandles,
//         optInFastPeriod: 24,
//         optInSlowPeriod: 52,
//         optInSignalPeriod: 10
//     });
//     return valuesIndicatorMACD.result;
// }

// module.exports = getValuesIndicatorATR;

var functionDesc = talib.explain("ATR");
console.dir(functionDesc);

function getValuesIndicatorATR(valueCandles) {
    let valuesIndicatorATR = talib.execute({
        name: "ATR",
        startIdx: 0,
        endIdx: valueCandles.close.length - 1,
        high: valueCandles.high, 
        low: valueCandles.low, 
        close: valueCandles.close,
        optInTimePeriod: 14
    });
    return valuesIndicatorATR.result;
}

module.exports = getValuesIndicatorATR;
