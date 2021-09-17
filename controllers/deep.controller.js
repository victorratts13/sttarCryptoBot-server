

const deep = (candle = {}) => {
    var deltaNeg = [];
    var deltaPos = [];
    for(var delta of candle.heatmapDelta){
        if(delta.toString().includes('.')){
            if(delta.toString().includes('-')){
                deltaNeg.push(delta)
            }else{
                deltaPos.push(delta)
            }
        }
    }

    return {
        a: deltaPos.length,
        b: deltaNeg.length
    }
}

module.exports = {
    deep
}