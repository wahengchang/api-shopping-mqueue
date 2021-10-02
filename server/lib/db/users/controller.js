const Base = require('../ControllerBase')
const UserModel = require('./model')

const removePasswordField = (json) => {
    delete json['password'];
    return json
}

class UserController extends Base {
    constructor(_config){
        super(_config)
        this.model = UserModel
    }
    async create(payload = {}) {
      const {model} = this
      const data = await model.create({...payload})
      const result = data.dataValues
      return removePasswordField(result)
    }
    async findById (id) {
        const result = await this.model.findOne({ where: {id}})
        return removePasswordField(result)
    }
    async findByUsername (username, config = {}) {
        const {includePassword} = config
        const result = await this.model.findOne({ where: {username}})

        if(includePassword) {
            return result
        }
        return removePasswordField(result)
    }
    async update(id, payload = {}) {
        const result = await this.model.update(payload, {where: {id}})
        return removePasswordField(result)
    }
}

module.exports = UserController