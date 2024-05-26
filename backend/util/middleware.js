const jwt = require('jsonwebtoken')
const { SECRET } = require('./config.js')
const { User} = require('../models');

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

const isStaff = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user.staff) {
    return res.status(401).json({ error: 'Operation not permitted' });
  }
  next();
};

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id)
  if (!user.admin) {
    return res.status(401).json({ error: 'operation not permitted' })
  }
  next()
}

module.exports = { tokenExtractor,isStaff,isAdmin }