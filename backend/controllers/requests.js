const router = require('express').Router();
const { tokenExtractor } = require('../util/middleware');
const { Request, User, RequestType } = require('../models');

router.get('/', async (req, res) => {
  try {
    const requests = await Request.findAll({
      attributes: { exclude: ['userId'] },
      include: [
        {
          model: User,
          attributes: ['name']
        },
        {
          model: RequestType,
          attributes: ['name'] 
        }
      ]
    });
    res.json(requests);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);

    const requestType = await RequestType.findByPk(req.body.requestTypeId);
    if (!requestType) {
      return res.status(400).json({ error: 'Invalid request type' });
    }

    const request = await Request.create({
      ...req.body,
      userId: user.id,
      requestTypeId: requestType.id
    });
    res.json(request);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: 'Invalid data' });
  }
});

const requestFinder = async (req, res, next) => {
  try {
    req.request = await Request.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name']
        },
        {
          model: RequestType,
          attributes: ['name'] 
        }
      ]
    });
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

router.get('/:id', requestFinder, async (req, res) => {
  if (req.request) {
    res.json(req.request);
  } else {
    res.status(404).json({ error: 'Request not found' });
  }
});

router.delete('/:id', requestFinder, async (req, res) => {
  if (req.request) {
    await req.request.destroy();
    res.status(204).end();
  } else {
    res.status(404).json({ error: 'Request not found' });
  }
});

module.exports = router;
