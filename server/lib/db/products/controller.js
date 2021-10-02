const Base = require('../ControllerBase')
const Sequelize = require('sequelize')
const Model = require('./model')

class UserController extends Base {
    constructor(_config){
        super(_config)

        const {sequelize} = this
        this.model = Model(sequelize, Sequelize)
    }
    async create(payload = {}) {
      const {model} = this
      const data = await model.create({...payload})
      return data.dataValues
    }
    findById (id) {
        return this.model.findOne({ where: {id}})
    }
    list() {
        return this.model.findAll()
    }
    update(id, payload = {}) {
        return this.model.update(payload, {where: {id}})
    }
}

module.exports = UserController