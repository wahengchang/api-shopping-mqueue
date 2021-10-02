const Sequelize = require('sequelize')

module.exports = (sequelize, type) => {
  return sequelize.define('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      username: {
        type: type.STRING,
        allowNull: false
      },
      balance: {
        type: type.FLOAT,
        defaultValue: 0,
        allowNull: false
      },      
  })
}