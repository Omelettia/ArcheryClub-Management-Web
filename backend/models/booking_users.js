const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class BookingUsers extends Model {}

BookingUsers.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  },
  bookingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'bookings', key: 'id' }
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'booking_users', // Corrected modelName
  indexes: [
    {
      unique: true,
      fields: ['userId', 'bookingId']
    }
  ]
});

module.exports = BookingUsers;
