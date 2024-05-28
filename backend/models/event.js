const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class Event extends Model {}

Event.init({
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
  creatorId: { // Foreign key for the user who created the event
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    },
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}, {
  sequelize,
  underscored: true,
  modelName: 'event'
});

module.exports = Event;
