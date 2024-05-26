const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize'); 
module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('request_types', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      disabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('request_types');
  }
};
