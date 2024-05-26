const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('bookings', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' } // Reference to the 'id' column in the 'users' table
      },
      event_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'events', key: 'id' } // Reference to the 'id' column in the 'events' table
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('bookings');
  },
};
