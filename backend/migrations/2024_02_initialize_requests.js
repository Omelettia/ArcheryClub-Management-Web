const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('requests', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' } // Reference to the 'id' column in the 'users' table
      },
      request_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'request_types', key: 'id' } // Reference to the 'id' column in the 'request_types' table
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('requests');
  },
};
