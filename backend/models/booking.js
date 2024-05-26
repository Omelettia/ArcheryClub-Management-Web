const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class Booking extends Model {
  static async calculateTotalPrice(id) {
    try {
      // Fetch booking with associated equipment
      const bookingWithEquipment = await Booking.findByPk(id, {
        include: [Equipment]
      });

      // Calculate total price based on equipment prices and duration
      let totalPrice = 0;
      bookingWithEquipment.equipments.forEach(equipment => {
        totalPrice += equipment.rentingPrice * bookingWithEquipment.duration;
      });

      // Update the total price in the booking record
      await Booking.update({ price: totalPrice }, { where: { id: id } });

      return totalPrice;
    } catch (error) {
      console.error('Error calculating total price:', error);
      throw error; // Re-throw the error for handling in the calling function
    }
  }
}

Booking.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  price: {
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
