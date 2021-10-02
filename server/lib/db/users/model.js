const Sequelize = require('sequelize')
const DB = require('../index.js')
const sequelize = DB.getSequelize()

const User = sequelize.define('User', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  balance: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
    allowNull: false
  },      
})


module.exports = User