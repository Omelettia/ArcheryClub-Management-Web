const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('equipment_types', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      purchasingPrice: { 
        type: DataTypes.FLOAT,
        allowNull: false
      },
      rentingPrice: { 
        type: DataTypes.FLOAT,
        allowNull: false
      },
      category: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      disabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('equipment_types');
  },
};
