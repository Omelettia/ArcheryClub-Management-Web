const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class Equipment extends Model {}

Equipment.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  purchasingPrice: { // Corrected field name
    type: DataTypes.FLOAT,
    allowNull: false
  },
  rentingPrice: { // Corrected field name
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'equipment'
});

module.exports = Equipment;
