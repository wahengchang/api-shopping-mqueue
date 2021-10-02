const Sequelize = require('sequelize')
const DB = require('../index.js')
const sequelize = DB.getSequelize()
const User = require('../users/model')
const Product = require('../products/model')

const Transation = sequelize.define('Transation', {
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
    type: Sequelize.NUMBER,
    allowNull: false
  },
})

Product.hasMany(Transation, {as: 'transation', foreignKey: 'productId'})
User.hasMany(Transation, {as: 'transation', foreignKey: 'userId'})
// Transation.belongsTo(Product)
// Transation.belongsTo(User)

// Product.hasMany(Transation, { as: "transation" });
// Transation.belongsTo(Product, {
//   foreignKey: "productId",
//   as: "product",
// });

// User.hasMany(Transation, { as: "transation" });
// Transation.belongsTo(User, {
//   foreignKey: "userId",
//   as: "user",
// }); 

module.exports = Transation