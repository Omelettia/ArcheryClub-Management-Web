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
  event_image: {
    type: DataTypes.STRING, 
    allowNull: true, 
  },
  participatable: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  starting_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  creator_id: { 
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
  timestamps: false,
  modelName: 'event'
});

module.exports = Event;
