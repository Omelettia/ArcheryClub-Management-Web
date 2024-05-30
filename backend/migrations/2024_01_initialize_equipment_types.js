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
      purchasing_price: { 
        type: DataTypes.FLOAT,
        allowNull: false
      },
      renting_price: { 
        type: DataTypes.FLOAT,
        allowNull: false
      },
      category: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      equipment_image: {
        type: DataTypes.STRING, 
        allowNull: true, 
      },
      skill_level: {
        type: DataTypes.STRING, 
        allowNull: true, 
      },
      disabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('equipment_types');
  },
};
