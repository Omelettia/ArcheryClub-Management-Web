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
  user_id: {
    type: DataTypes.INTEGER, 
    allowNull: true,
    references: { 
      model: 'users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  equipment_type_id: { // Foreign key reference to EquipmentType
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
  timestamps: false,
  modelName: 'equipments'
});

module.exports = Equipment;
