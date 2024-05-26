const Request = require('./request')
const RequestType = require('./request_type')
const User = require('./user')
const Equipment = require('./equipment')
const Booking = require('./booking')
const Event = require('./event')
const BookingEquipments = require('./booking_equipments')
const BookingUsers = require('./booking_users')
const EquipmentType = require('./equipment_type')


User.hasMany(Request)
Request.belongsTo(User)

RequestType.hasMany(Request)
Request.belongsTo(RequestType)

EquipmentType.hasMany(Equipment)
Equipment.belongsTo(EquipmentType)

Event.hasMany(Booking)
Booking.belongsTo(Event)


User.belongsToMany(Booking, { through: BookingUsers, as: 'bookings' });
Booking.belongsToMany(User, { through: BookingUsers, as: 'users' });

Equipment.belongsToMany(Booking, { through: BookingEquipments, as: 'bookings' });
Booking.belongsToMany(Equipment, { through: BookingEquipments, as: 'equipments' });



module.exports = {
  Request,RequestType,User,Equipment,Booking,BookingEquipments,BookingUsers,EquipmentType,Event
}