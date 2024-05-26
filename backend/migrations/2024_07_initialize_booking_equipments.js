const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('booking_equipments', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      equipmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'equipments', key: 'id' } // Reference to the 'id' column in the 'equipments' table
      },
      bookingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'bookings', key: 'id' } // Reference to the 'id' column in the 'bookings' table
      },
    });

    await queryInterface.addIndex('booking_equipments', ['equipmentId', 'bookingId'], {
      unique: true
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('booking_equipments');
  },
};
