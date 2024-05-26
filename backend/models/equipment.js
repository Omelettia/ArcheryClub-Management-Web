const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class Equipment extends Model {}

Equipment.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  state: {
    type: DataTypes.TEXT,
    allowNull: false
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'equipment'
});

module.exports = Equipment;
