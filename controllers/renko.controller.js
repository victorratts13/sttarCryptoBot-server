const TensorChart = require('tensorchart-api');
const tensor = new TensorChart('binance', 'BTCUSDT');
var renko = require('technicalindicators').renko;
const heikinashi = require('technicalindicators').heikinashi
const { inputDataBind, returnIndividual } = require('../controllers/analizer.controller');


const formateHeikinAshi = (candles = {}) => {
    var stick = {
        open: candles.o,
        close: candles.c,
        high: candles.h,
        low: candles.l,
        volume: candles.v,
        timestamp: candles.t
    }

    var henki = heikinashi(stick);
    return henki;
}

const liveHeikinAshi = (callback) => {
    var openArr = [], 
    closeArr = [], 
    highArr = [], 
    lowArr = [], 
    volumeArr = [], 
    timestampArr = [], 
    slenght = 100;
    tensor.liveChartCandle({type: 'reg', time: '5min', exchangeAndPair: 'binanceBTCUSDT'}, call => {
        //console.log(`##########################\n| price: ${call.close} \n`)
        openArr.push(call.open)
        closeArr.push(call.close)
        highArr.push(call.high)
        lowArr.push(call.low)
        volumeArr.push(call.vol)
        timestampArr.push(call.time)
        var stick = {
            open: openArr.reverse().slice(0, slenght),
            close: closeArr.reverse().slice(0, slenght),
            high: highArr.reverse().slice(0, slenght),
            low: lowArr.reverse().slice(0, slenght),
            volume: volumeArr.reverse().slice(0, slenght),
            timestamp: timestampArr.reverse().slice(0, slenght)
        }
        var result = heikinashi(stick)
        var timmer = returnIndividual(result.timestamp.slice(0, 2))
        if(timmer.length > 1){
            callback(result)
        }
    })
}

const formatRenko = (candles = {}, brickSize = 0.001) => {
    var stick = {
        open: candles.c,
        close: candles.c,
        high: candles.c,
        low: candles.c,
        volume: candles.c,
        timestamp: candles.t
    }

    var result = renko(Object.assign({}, stick, {brickSize : brickSize, useATR : false }))
    return(result)
}


const liveRenko = (callback) => {
    var arr = [], 
    openArr = [], 
    closeArr = [], 
    highArr = [], 
    lowArr = [], 
    volumeArr = [], 
    timestampArr = [], 
    slenght = 100;
    tensor.liveChartCandle({type: 'reg', time: '5min', exchangeAndPair: 'binanceBTCUSDT'}, call => {
        //console.log(`##########################\n| price: ${call.close} \n`)
        openArr.push(call.open)
        closeArr.push(call.close)
        highArr.push(call.high)
        lowArr.push(call.low)
        volumeArr.push(call.vol)
        timestampArr.push(call.time)
        var stick = {
            open: openArr.reverse().slice(0, slenght),
            close: closeArr.reverse().slice(0, slenght),
            high: highArr.reverse().slice(0, slenght),
            low: lowArr.reverse().slice(0, slenght),
            volume: volumeArr.reverse().slice(0, slenght),
            timestamp: timestampArr.reverse().slice(0, slenght)
        }
        var result = renko(Object.assign({}, stick, {brickSize : 0.001, useATR : false }))
        var timmer = returnIndividual(result.timestamp.slice(0, 2))
        if(timmer.length > 1){
            callback(result)
        }
    })
}

module.exports = {
    liveRenko, formatRenko, formateHeikinAshi, liveHeikinAshi
}