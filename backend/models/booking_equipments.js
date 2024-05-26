const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class BookingEquipments extends Model {}

BookingEquipments.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  equipmentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'equipments', key: 'id' }
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
  modelName: 'booking_equipments', 
  indexes: [
    {
      unique: true,
      fields: ['equipmentId', 'bookingId']
    }
  ]
});

module.exports = BookingEquipments;
