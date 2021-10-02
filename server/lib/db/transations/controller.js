const Base = require('../ControllerBase')
const Model = require('./model')
const ProductModel = require('../products/model')

class Controller extends Base {
    constructor(_config){
        super(_config)
        const {sequelize} = this
        this.model = Model
    }
    async create(payload = {}) {
      const {model} = this
      const data = await model.create({...payload})
      return data.dataValues
    }
    findById (id) {
        return this.model.findOne({
            where: {id},
        })
    }
    list() {
        return this.model.findAll()
    }
    update(id, payload = {}) {
        return this.model.update(payload, {where: {id}})
    }
}

module.exports = Controller