const router = require('express').Router();

const { User, Request, Booking } = require('../models');
const { tokenExtractor, isAdmin } = require('../util/middleware');

// Endpoint to update user information
router.put('/profile/:id', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { name, phonenumber, address, points, rank, profileImage } = req.body;
    user.name = name || user.name;
    user.phonenumber = phonenumber || user.phonenumber;
    user.address = address || user.address;
    user.points = points || user.points;
    user.rank = rank || user.rank;
    user.profileImage = profileImage || user.profileImage;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:username', tokenExtractor, isAdmin, async (req, res) => {
  const user = await User.findOne({
    where: { username: req.params.username }
  });

  if (user) {
    user.staff = !user.staff;
    await user.save();
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Booking,
        attributes: ['name', 'id'],
        attributes: []
      }
    ]
  });
  res.json(users);
});

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Find the user with the specified ID
    const user = await User.findByPk(req.params.id);

    // If no user is found, return a 404 status code with an empty response
    if (!user) {
      return res.status(404).end();
    }

    // Fetch all information of the user (including associations)
    const userData = await User.findByPk(req.params.id, { include: [/* include any associations here */] });

    // Send the user data in the response
    res.json(userData);
  } catch (error) {
    // If an error occurs, return a 500 status code with an error message
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
