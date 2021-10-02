const Sequelize = require('sequelize')

module.exports = (sequelize, type) => {
  return sequelize.define('products', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      title: {
        type: type.STRING,
        allowNull: false
      },
      price: {
        type: type.FLOAT,
        defaultValue: 0,
        allowNull: false
      },      
      quantity: {
        type: type.INTEGER,
        defaultValue: 0,
        allowNull: true
      },      
      beginAt: {
        type: type.DATE,
        allowNull: true
      },      
  })
}