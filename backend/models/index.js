const Request = require('./request');
const RequestType = require('./request_type');
const User = require('./user');
const Equipment = require('./equipment');
const Booking = require('./booking');
const Event = require('./event');
const BookingEquipments = require('./booking_equipments');
const EquipmentType = require('./equipment_type');

User.hasMany(Request);
Request.belongsTo(User);

RequestType.hasMany(Request);
Request.belongsTo(RequestType);

EquipmentType.hasMany(Equipment);
Equipment.belongsTo(EquipmentType);

Event.hasMany(Booking);
Booking.belongsTo(Event);

User.hasMany(Booking);
Booking.belongsTo(User);

// Many-to-Many association between Equipment and Booking through BookingEquipments
Equipment.belongsToMany(Booking, { through: BookingEquipments });
Booking.belongsToMany(Equipment, { through: BookingEquipments });

module.exports = {
  Request,
  RequestType,
  User,
  Equipment,
  Booking,
  BookingEquipments,
  EquipmentType,
  Event
};
