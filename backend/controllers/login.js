const jwt = require('jsonwebtoken');
const router = require('express').Router();

const { SECRET } = require('../util/config');
const User = require('../models/user');

router.post('/', async (request, response) => {
  const body = request.body;

  const user = await User.findOne({
    where: { 
      username: body.username 
    }
  });
  
  if (!(user )) {
    return response.status(401).json({
      error: 'invalid username or password'
    });
  }
  const passwordCorrect = body.password === user.password;

  if (!(passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
    name: user.name,
    profile_image: user.profile_image,
    admin: user.admin,
    staff: user.staff,
  };

  const token = jwt.sign(userForToken, SECRET);

  response.status(200).send({ token });
});

module.exports = router;
