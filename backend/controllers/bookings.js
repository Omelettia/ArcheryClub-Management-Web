const router = require('express').Router()

const { User, Equipment, Booking, BookingEquipments } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      attributes: { exclude: ['userId'] },
      include: [
        {
          model: Equipment,
          attributes: ['id'],
          through: {
            attributes: []
          }
        },
        {
          model: User,
          attributes: ['name','profile_image','id']
        },
      ]
    });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);

    // Create the booking with the calculated total price
    const booking = await Booking.create({
      ...req.body,
      userId: user.id,
    });

    // If request body contains equipmentIds array, associate equipments with booking
    if (req.body.equipmentIds && req.body.equipmentIds.length > 0) {
      // Loop through each equipmentId and duration, and associate them with the booking
      for (const { equipmentId, duration } of req.body.equipmentIds) {
        await booking.addEquipment(equipmentId, { through: { duration: duration } });
      }
    }

    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Invalid data' });
  }
});


const bookingFinder = async (req, res, next) => {
  try {
    req.booking = await Booking.findByPk(req.params.id, {
      include: [
        {
          model: Equipment,
          attributes: ['id'],
          through: {
            attributes: []
          }
        },
        {
          model: User,
          attributes: ['name']
        },
      ]
    });
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};

router.get('/:id', bookingFinder, async (req, res) => {
  if (req.booking) {
    res.json(req.booking);
  } else {
    res.status(404).json({ error: 'Booking not found' });
  }
});

router.delete('/:id', bookingFinder, async (req, res) => {
  if (req.booking) {
    await req.booking.destroy();
    res.status(204).end();
  } else {
    res.status(404).json({ error: 'Booking not found' });
  }
});

module.exports = router;
