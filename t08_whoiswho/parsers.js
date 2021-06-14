const fs = require('fs')
const parse = require('csv-parse')

module.exports.parseCSV = function parseCSV(path) {
    const data = []
    return new Promise((resolve, reject) => {
        fs.createReadStream(path)
            .pipe(parse({ delimiter: ',' }))
            .on('data', row => {
                data.push(row)
            })
            .on('end', () => resolve(data))
    })
}
module.exports.transform = function transform(data) {
    let result = []
    data.map(item => {
        result.push([item[0], item[1], item[2], item[3], item[4],
            item[5], item[6], item[7], item[8], item[9], item[10]])
    })
    return result
}