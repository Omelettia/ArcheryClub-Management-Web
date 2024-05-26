const router = require('express').Router()

const { User, Request, Booking } = require('../models')
const { tokenExtractor } = require('../util/middleware')

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id)
  if (!user.admin) {
    return res.status(401).json({ error: 'operation not permitted' })
  }
  next()
}

router.put('/:username', tokenExtractor, isAdmin, async (req, res) => {
  const user = await User.findOne({ 
    where: { username: req.params.username }
  })

  if (user) {
    user.staff = -user.staff
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.get('/', async (req, res) => {
  const users = await User.findAll({ 
    include: [
      {
        model: Request,
        attributes: { exclude: ['userId'] } 
      }, 
      {
        model: Booking,
        attributes: ['name', 'id'],
        through: {
          attributes: []
        }
      }
    ]
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (!user) {
    return res.status(404).end()
  }

  let bookings = undefined

  if (req.query.bookings) { // Corrected to query for 'bookings' instead of 'teams'
    bookings = await user.getBookings({
      attributes: ['name'],
      joinTableAttributes: []  
    })
  }

  res.json({ ...user.toJSON(), bookings }) // Changed teams to bookings
})

module.exports = router
