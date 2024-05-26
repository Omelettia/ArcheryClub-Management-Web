const router = require('express').Router();
const { User, Booking, Event } = require('../models');
const { tokenExtractor } = require('../util/middleware');

router.get('/', async (req, res) => {
  try {
    const events = await Event.findAll({
      attributes: { exclude: ['userId'] },
      include: [
        {
          model: Booking,
          attributes: ['id'],
          include: [
            {
              model: User,
              attributes: ['name']
            }
          ]
        },
      ]
    });
    res.json(events);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);

    // Create the event
    const event = await Event.create({
      ...req.body,
    });

    // Create a booking for the event creator
    const booking = await Booking.create({
      eventId: event.id,
      userId: user.id,
    });

    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Invalid data' });
  }
});

router.post('/:eventId/bookings', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);

    // Check if the event exists
    const event = await Event.findByPk(req.params.eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Create a booking for the user joining the event
    const booking = await Booking.create({
      eventId: event.id,
      userId: user.id,
    });

    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Invalid data' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: [
        {
          model: Booking,
          attributes: ['id'],
          include: [
            {
              model: User,
              attributes: ['name']
            }
          ]
        },
        {
          model: User,
          attributes: ['name']
        },
      ]
    });
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (event) {
      await event.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
