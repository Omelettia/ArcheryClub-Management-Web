const router = require('express').Router();
const { sequelize } = require('../util/db');

const { User, Request, Booking } = require('../models');
const { tokenExtractor, isAdmin,isStaff } = require('../util/middleware');

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
    user.rank = rank || user.rank;
    user.profileImage = profileImage || user.profileImage;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/point/:id', tokenExtractor, isStaff, async (req, res) => {
  try {
    // Find the user by ID
    const user = await User.findByPk(req.params.id);

    // If the user is not found, return a 404 status code
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Extract the point from the request body
    const { points } = req.body;

    // Update the user's points
    user.points = points;

    // Save the updated user
    await user.save();

    // Send the updated user data in the response
    res.json(user);
  } catch (error) {
    // If an error occurs, return a 500 status code with an error message
    console.error('Error updating user points:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/update-ranks', tokenExtractor, isStaff, async (req, res) => {
  try {
    // Call the method to calculate and update ranks
    await User.calculateRanks();

    // Send a success message
    res.json({ message: 'User ranks updated successfully' });
  } catch (error) {
    console.error('Error updating user ranks:', error);
    res.status(500).json({ error: 'Internal server error' });
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

// New endpoint to get the total number of users
router.get('/total/count', async (req, res) => {
  try {
    const count = await User.count();
    res.json({ totalUsers: count });
  } catch (error) {
    console.error('Error fetching user count:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
