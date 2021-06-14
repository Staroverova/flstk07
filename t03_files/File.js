'use strict'

const fs = require('fs')

module.exports = class File {
    constructor(name) {
        this.name = name
    }
    write(content) {
        let dir = './tmp'
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }
        fs.writeFileSync(`tmp/${this.name}`, content)
    }
    read() {
        return fs.readFileSync(`tmp/${this.name}`, 'utf8')
    }
    delete() {
        try {
            fs.unlinkSync(`tmp/${this.name}`)
        } catch (err) {
            console.error(err)
        }
    }
}