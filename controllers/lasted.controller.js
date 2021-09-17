//const { rejects } = require('assert')
const fs = require('fs')

const lestedCreate = (order = '', price = 0.00) => {
    fs.writeFile('./lested.json', JSON.stringify({ data: order, price: price }), (err) => {
        if (err) {
            console.log('error to create lested file')
        } else {
            console.log(`| Order: ${order}`)
        }
    })
}

const lestedValidate = (order = '', price = 0.00) => {
    return new Promise((resolve, reject) => {
        var file_descriptor = fs.openSync(`./lested.json`);
        fs.readFile('./lested.json', (err, data) => {
            if (err) {
                console.log(`| error to read file!`)
                lestedCreate(order, price) 
            } else {
                try{
                    data = data.toString()
                    return resolve(JSON.parse(data))
                }catch(e){
                    console.log(e.message)
                    return reject(JSON.parse({"data": "Erro to read file. "}))
                }
                
            }
        })
        console.log(`\x1b[35m| -------------------------------\x1b[0m`)
        console.log(`| FileDescriptor: ${file_descriptor}`)
        fs.close(file_descriptor, (err) => {
            if(err){
                console.log(`| Logger: ${err}`)
            }else{
                console.log(`| Logger: file closed with success.`)
            }
        })
        console.log(`\x1b[35m| -------------------------------\x1b[0m`)
    })
}

module.exports = {
    lestedCreate, lestedValidate
}