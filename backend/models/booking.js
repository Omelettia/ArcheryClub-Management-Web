const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class Booking extends Model {}

Booking.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  underscored: true,
  modelName: 'booking'
});

module.exports = Booking;
