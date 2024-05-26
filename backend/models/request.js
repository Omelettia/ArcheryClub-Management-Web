const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Request extends Model {}

Request.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
}, {
  sequelize,
  underscored: true,
  modelName: 'request'
})

module.exports = Request