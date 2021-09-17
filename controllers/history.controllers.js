
const fs = require('fs');

const historyController = (params = {
    order: '',
    value: 0,
    time: 0,
    price: 0,
}) => {
    var content = `time: ${new Date()} - price: ${params.price} | order: ${params.order} - value: ${params.value}\n`
    fs.readFile('./history.log', (err, data) => {
        if(err){
            // console.log('erro de leitura do arquivo -> '+err)
            fs.writeFile('./history.log', content, (err) => {
                if(err){
                    // console.log('erro ao gerar arquivo de log')
                }else{
                    // console.log(content)
                }
            })
        }else{
            content = `${data.toString()}${content}`
            fs.writeFile('./history.log', content, (err) => {
                if(err){
                    // console.log('erro ao gerar arquivo de log')
                }else{
                    // console.log(content)
                }
            })
        }
    })
    
}

module.exports = {
    historyController
}