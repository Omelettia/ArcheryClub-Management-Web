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
  purchasingPrice: { 
    type: DataTypes.FLOAT,
    allowNull: false
  },
  rentingPrice: { 
    type: DataTypes.FLOAT,
    allowNull: false
  },
  category: {
    type: DataTypes.TEXT,
    allowNull: false
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
