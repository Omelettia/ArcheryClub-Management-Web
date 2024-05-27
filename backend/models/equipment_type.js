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
  purchasing_price: { 
    type: DataTypes.FLOAT,
    allowNull: false
  },
  renting_price: { 
    type: DataTypes.FLOAT,
    allowNull: false
  },
  category: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  equipment_image: {
    type: DataTypes.STRING, 
    allowNull: true, 
  },
  skill_level: {
    type: DataTypes.STRING, 
    allowNull: true, 
  },
  disabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'equipment_type'
});

module.exports = EquipmentType;
