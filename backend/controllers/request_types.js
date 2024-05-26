const router = require('express').Router();
const { User, RequestType } = require('../models');
const { tokenExtractor, isAdmin } = require('../util/middleware');

router.post('/', tokenExtractor, isAdmin, async (req, res) => {
  try {
    const requestType = await RequestType.create(req.body);
    res.json(requestType);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    let requestTypes;
    if (req.user && req.user.admin) {
      // If the user is admin, fetch all request types
      requestTypes = await RequestType.findAll();
    } else {
      // If the user is not admin, fetch only enabled request types
      requestTypes = await RequestType.findAll({ where: { disabled: false } });
    }
    res.json(requestTypes);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

const requestTypeFinder = async (req, res, next) => {
  try {
    req.requestType = await RequestType.findByPk(req.params.id);
    next();
  } catch (error) {
    next(error);
  }
};

router.get('/:id', requestTypeFinder, async (req, res) => {
  if (req.requestType) {
    res.json(req.requestType);
  } else {
    res.status(404).end();
  }
});

router.put('/:id/disable', tokenExtractor, isAdmin, requestTypeFinder, async (req, res) => {
  try {
    if (req.requestType) {
      await req.requestType.update({ disabled: true });
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Request Type not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
