const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class EquipmentType extends Model {}

EquipmentType.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.TEXT,
    allowNull: false
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'equipment_type'
});

module.exports = EquipmentType;
