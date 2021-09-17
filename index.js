const data = require('./database.json').data;
const ccxt = require('ccxt');
const TensorChart = require('tensorchart-api');
const binance = new ccxt.binance();
const tensor = new TensorChart('binance', 'BTCUSDT');
const { historyController } = require('./controllers/history.controllers');
const { lestedValidate, lestedCreate } = require('./controllers/lasted.controller');
const { inputDataBind } = require('./controllers/analizer.controller');
const { formatRenko, formateHeikinAshi, liveHeikinAshi } = require('./controllers/renko.controller');
const { deep } = require('./controllers/deep.controller'); 

(async () => {
    tensor.liveChart({ type: 'reg', exchangeAndPair: 'binanceBTCUSDT' }, async(call) => {
        try {
            if (call.type == 'candle') {
                console.clear();
                
                var candle = call.data['5min'];
                console.log(`################ Data analytics ###################\n`)
                console.log(`| actualValue  : ${candle.close}`)
                var deltaVol = deep(candle);
                //console.log(deltaVol)
                if (candle.buyVolume > candle.sellVolume && deltaVol.a > deltaVol.b) {
                    console.log(`| buyVolume    \x1b[32m: ${candle.buyVolume}\x1b[0m`)
                    console.log(`| sellVolume   : ${candle.sellVolume}`)
                    
                    var lested = await lestedValidate('Buy', candle.close)
                    //console.log(lested)
                    if(lested.data == 'Sell' /* && candle.close > lested.price */){
                        historyController({
                            order: 'Buy',
                            price: candle.close,
                            time: candle.dateInt,
                            value: 0.01
                        })
                        lestedCreate('Buy', candle.close)
                    }
                    //lestedCreate('Buy')
                } 
                if(candle.buyVolume < candle.sellVolume && deltaVol.a < deltaVol.b) {
                    console.log(`| buyVolume    : ${candle.buyVolume}`)
                    console.log(`| sellVolume   \x1b[31m: ${candle.sellVolume}\x1b[0m`)
                    
                    var lested = await lestedValidate('Sell', candle.close)
                    //console.log(lested)
                    if(lested.data == 'Buy' /* && candle.close < lested.price */){
                        historyController({
                            order: 'Sell',
                            price: candle.close,
                            time: candle.dateInt,
                            value: 0.01
                        })
                        lestedCreate('Sell', candle.close)
                    }
                    //lestedCreate('Sell')
                }
                var x = 0;
                var delta = candle.heatmapDelta.map(deltas => {
                    if(deltas.toString().includes('.')){
                        if(deltas.toString().includes('-')){
                            return `| Deltas ${x++}: \x1b[31m${deltas}\x1b[0m`
                        }else{
                            return `| Deltas ${x++}: \x1b[32m${deltas}\x1b[0m` 
                        }
                    }else{
                        return `| Deltas ${x++}: ${deltas.toString().includes('.') == false ? '\x1b[33m'+deltas+'\x1b[0m' : deltas}`
                    }
                    //return `| Deltas ${x++}: ${deltas.toString().includes('.') == false ? '\x1b[33m'+deltas+'\x1b[0m' : deltas}`
                })

                console.log(`| TotalVolume  : ${candle.volume}`)
                console.log(`| VolumeProfile: ${candle.vwap}`)
                console.log(`| -------------------------------`)
                console.log(`| actualTimmer : ${candle.dateInt}`)
                //console.log(`| UTCTimmerFor : ${candle.date}`)

                delta.forEach(dt => {
                    console.log(dt)
                });
            }
        } catch (e) {
            console.log("|-------- Fix atempt ------|")
            console.log("| Data: " + e.message)
        }

    })
    // liveHeikinAshi(call => {
    //     //var cand = inputDataBind(call);
    //     console.clear();
    // console.log(`################ Data Alitic ###################\n`)
    // console.log(`| actualValue: ${call.open[0]}`)
    // console.log(`| beforeValue: ${call.open[1]}`)
    // console.log(`| lestedValue: ${call.open[2]}`)
    // console.log(`| -------------------------------`)
    // console.log(`| actualTimmer: ${call.timestamp[0]}`)
    // console.log(`| beforeTimmer: ${call.timestamp[1]}`)
    // console.log(`| lestedTimmer: ${call.timestamp[2]}`)



    //     // if (call.open[0] > call.open[2]) {
    //     //     console.log(`| \x1b[33mexecuting Buy Order in USDT: ${call.open[0]}\x1b[0m`)
    // historyController({
    //     order: 'Buy',
    //     price: call.open[0],
    //     time: call.timestamp[0],
    //     value: 0.01
    // })
    //     // }

    //     // if (call.open[0] < call.open[2]) {
    //     //     console.log(`| \x1b[33mexecuting Sell Order in USDT: ${call.open[0]}\x1b[0m`)
    //     //     historyController({
    //     //         order: 'Sell',
    //     //         price: call.open[0],
    //     //         time: call.timestamp[0],
    //     //         value: 0.01
    //     //     })
    //     // }


    // })
})();
