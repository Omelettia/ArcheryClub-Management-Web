const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class RequestType extends Model {}

RequestType.init({
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
  timestamps: false,
  modelName: 'request_type'
})

module.exports = RequestType