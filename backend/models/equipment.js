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
    type: DataTypes.STRING, 
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER, 
    allowNull: true,
    references: { 
      model: 'users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  equipmentTypeId: { // Foreign key reference to EquipmentType
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'equipment_types',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}, {
  sequelize,
  underscored: true,
  modelName: 'equipment'
});

module.exports = Equipment;
