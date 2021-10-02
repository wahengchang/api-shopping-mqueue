const Sequelize = require('sequelize')
const DB = require('./index.js')

class ControlerBase {
    constructor(_config){
        this.sequelize = DB.getSequelize()
    }
    init() {
        return DB.init()
    }
    findById () {
        throw new Error('not implement yet')
    }
    list() {
        throw new Error('not implement yet')
    }
    update() {
        throw new Error('not implement yet')
    }
    
}

module.exports = ControlerBase