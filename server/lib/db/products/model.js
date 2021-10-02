const Sequelize = require('sequelize')
const DB = require('../index.js')
const sequelize = DB.getSequelize()

const Product = sequelize.define('Product', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.FLOAT,
        defaultValue: 1,
        allowNull: false
      },      
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: true
      },      
      beginAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW
      },      
  })

  module.exports = Product