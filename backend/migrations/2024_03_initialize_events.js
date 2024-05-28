const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('events', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      participatable: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      creator_id: { // Foreign key for the user who created the event
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('events');
  },
};
