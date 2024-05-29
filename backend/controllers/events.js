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
    const userId = req.decodedToken.id; // Extract userId from the decoded token
    const eventId = req.params.eventId;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Check if the user is already a participant
    const existingParticipant = await EventUsers.findOne({
      where: { userId: user.id, eventId: event.id }
    });

    if (existingParticipant) {
      return res.status(400).json({ error: 'User is already a participant' });
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
          as: 'creator', // Specify the alias for the association
          attributes: ['name']
        },
        {
          model: User,
          as: 'participants', // Specify the alias for the association
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



router.put('/profile/:id', tokenExtractor, async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id); // Change Equipment to Event
    if (!event) {
      return res.status(404).json({ error: 'Event not found' }); // Change Equipment to Event
    }

    const { name, description, event_image, participatable, starting_date } = req.body; // Update fields for event
    event.name = name || event.name;
    event.description = description || event.description;
    event.event_image = event_image || event.event_image;
    event.participatable = participatable !== undefined ? participatable : event.participatable;
    event.starting_date = starting_date || event.starting_date;

    await event.save();
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
