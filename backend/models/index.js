
const User = require('./user');
const Equipment = require('./equipment');
const Booking = require('./booking');
const Event = require('./event');
const BookingEquipments = require('./booking_equipments');
const EventUsers = require('./event_users');
const EquipmentType = require('./equipment_type');


User.hasMany(Event);
Event.belongsTo(User, { as: 'creator', foreignKey: 'creator_id' });

User.hasMany(Booking);
Event.belongsTo(Booking);

User.hasMany(Equipment);
Equipment.belongsTo(User);

EquipmentType.hasMany(Equipment);
Equipment.belongsTo(EquipmentType);

User.belongsToMany(Event, { through: EventUsers });
Event.belongsToMany(User, { as: 'participants', through: EventUsers });

// Many-to-Many association between Equipment and Booking through BookingEquipments
Equipment.belongsToMany(Booking, { through: BookingEquipments });
Booking.belongsToMany(Equipment, { through: BookingEquipments });

module.exports = {
  User,
  Equipment,
  Booking,
  BookingEquipments,
  EquipmentType,
  Event
};
