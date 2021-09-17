const data = require('./database.json').data;
const ccxt = require('ccxt');
const binance = new ccxt.binance();
const TensorChart = require('tensorchart-api');
const tensor = new TensorChart('binance', 'BNBBTC');


(async() => {
    tensor.liveChartCandle({type: 'reg', time: '5min', exchangeAndPair: 'binanceBTCUSDT'}, call => {
        console.log(call)
    })
    // for(var dt of data){
    //     if(dt.status == true){
    //         console.log(dt)
    //         binance.apiKey = dt.apiKey
    //         binance.secret = dt.apiSecret
    //         console.log(binance.id)
    //         var market = await binance.loadMarkets()
    //         console.log(market['BTC/USDT'].id)
    //     }
        
    // }
        
})();
