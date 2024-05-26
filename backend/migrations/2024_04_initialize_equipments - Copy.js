const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('equipments', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      state: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      equipment_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'equipment_types', key: 'id' } // Reference to the 'id' column in the 'equipment_types' table
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('equipments');
  },
};
