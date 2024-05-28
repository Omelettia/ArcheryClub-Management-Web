const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../util/db');

class EventUsers extends Model {}

EventUsers.init({
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    },
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  eventId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'events',
      key: 'id'
    },
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}, {
  sequelize,
  underscored: true,
  modelName: 'event_users',
});

module.exports = EventUsers;
