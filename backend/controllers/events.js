const router = require('express').Router();
const { User, Event, EventUsers} = require('../models');
const { sequelize } = require('../util/db');
const { tokenExtractor } = require('../util/middleware');

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.findAll({
      attributes: [
        'id',
        'name',
        'description',
        'event_image',
        'participatable',
        'starting_date',
        [sequelize.literal('(SELECT COUNT(*) FROM event_users WHERE event_users.event_id = event.id)'), 'participants']
      ],
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name']
        }
      ],
      group: ['event.id', 'creator.id']
    });
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Create a new event
router.post('/', tokenExtractor, async (req, res) => {
  console.log('Incoming request body:', req.body); // Log the incoming request body
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const event = await Event.create({
      ...req.body,
      creatorId: user.id
    });
    res.json(event);
  } catch (error) {
    console.error('Error creating event:', error.message);
    if (error.errors) {
      error.errors.forEach(err => console.error('Validation error:', err.message));
    }
    res.status(400).json({ error: 'Invalid data', details: error.errors });
  }
});


// Add a user as a participant to an event
router.post('/:eventId/participants', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const event = await Event.findByPk(req.params.eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    await EventUsers.create({
      userId: user.id,
      eventId: event.id
    });
    res.status(201).json({ message: 'User added as a participant' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Invalid data' });
  }
});

// Get a specific event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['name']
        },
        {
          model: User,
          through: { attributes: [] },
          attributes: ['name']
        }
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

// Get all participants for a specific event
router.get('/:eventId/participants', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    const participants = await EventUsers.findAll({
      where: { eventId: event.id },
      include: [{
        model: User,
        attributes: ['name']
      }]
    });
    res.json(participants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Delete an event by ID
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
