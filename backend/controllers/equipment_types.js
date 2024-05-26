const router = require('express').Router();
const { User, EquipmentType } = require('../models');
const { tokenExtractor, isStaff, isAdmin } = require('../util/middleware');

router.post('/', tokenExtractor, isStaff, async (req, res) => {
  try {
    const equipmentType = await EquipmentType.create(req.body);
    res.json(equipmentType);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    let equipmentTypes;
    if (req.user && (req.user.staff || req.user.admin)) {
      // If the user is staff or admin, fetch all equipment types
      equipmentTypes = await EquipmentType.findAll();
    } else {
      // If the user is not staff or admin, fetch only enabled equipment types
      equipmentTypes = await EquipmentType.findAll({ where: { disabled: false } });
    }
    res.json(equipmentTypes);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

const equipmentTypeFinder = async (req, res, next) => {
  try {
    const equipmentType = await EquipmentType.findByPk(req.params.id);
    if (!equipmentType) {
      return res.status(404).end();
    }
    req.equipmentType = equipmentType;
    next();
  } catch (error) {
    next(error);
  }
};

router.get('/:id', equipmentTypeFinder, async (req, res) => {
  res.json(req.equipmentType);
});

router.put('/:id/disable', tokenExtractor, isAdmin, equipmentTypeFinder, async (req, res) => {
  try {
    await req.equipmentType.update({ disabled: true });
    res.status(204).end();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
