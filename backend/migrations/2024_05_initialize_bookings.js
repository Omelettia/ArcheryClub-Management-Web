const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('bookings', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      total_price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      is_returned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('bookings');
  },
};
