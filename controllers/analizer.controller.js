
function returnIndividual(arr = []) {
    //var arr = ['foo', 'bar', 'foo'];
    var novaArr = arr.filter((este, i) => arr.indexOf(este) === i);
    return(novaArr);
}

function inputDataBind(candles = {
    open: [],
    close: [],
    high: [],
    low: [],
    volume: [],
    timestamp: []
}) {

    var times = candles.timestamp.slice(0, 2);
    var comming = returnIndividual(times)
    if(comming.length > 1){
        return candles;
    }
    //var closes = candles.close.slice(0, comming.length - 1);

}

module.exports = {
    inputDataBind, returnIndividual
}