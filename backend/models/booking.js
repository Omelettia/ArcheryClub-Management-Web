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
  is_returned: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  sequelize,
  underscored: true,
  modelName: 'bookings'
});

module.exports = Booking;
