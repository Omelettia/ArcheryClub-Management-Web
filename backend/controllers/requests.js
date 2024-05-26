const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')

const { tokenExtractor } = require('../util/middleware')
const { Request, User } = require('../models')
const { SECRET } = require('../util/config')

router.get('/', async (req, res) => {
  const where = {}

  if (req.query.important) {
    where.important = req.query.important === "true"
  } 

  if (req.query.search) {
    where.content = {
      [Op.substring]: req.query.search
    }
  }

  const requests = await Request.findAll({ 
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where
  })

  res.json(requests)
})

router.post('/', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const request = await Request.create({...req.body, userId: user.id, date: new Date()})
    res.json(request)
  } catch(error) {
    console.log(error)
    return res.status(400).json({ error })
  }
})

const requestFinder = async (req, res, next) => {
  req.request = await Request.findByPk(req.params.id)
  next()
} 

router.get('/:id', requestFinder, async (req, res) => {
  if (req.request) {
    res.json(req.request)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', requestFinder, async (req, res) => {
  if (req.request) {
    await req.request.destroy()
  }
  res.status(204).end()
})

router.put('/:id', requestFinder, async (req, res) => {
  if (req.request) {
    req.request.important = req.body.important
    await req.request.save()
    res.json(req.request)
  } else {
    res.status(404).end()
  }
})

module.exports = router
