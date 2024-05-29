const router = require('express').Router();
const { User, EquipmentType,Equipment } = require('../models');
const { tokenExtractor, isStaff, isAdmin } = require('../util/middleware');
const { Op } = require('sequelize');


router.post('/', tokenExtractor, isStaff, async (req, res) => {
  try {
    const equipmentType = await EquipmentType.create(req.body);
    res.json(equipmentType);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.put('/profile/:id', tokenExtractor, async (req, res) => {
  try {
    const equipmentType = await EquipmentType.findByPk(req.params.id);
    if (!equipmentType) {
      return res.status(404).json({ error: 'EquipmentType not found' });
    }

    const { name, description, purchasing_price, renting_price, category, equipment_image, skill_level } = req.body;
    equipmentType.name = name || equipmentType.name;
    equipmentType.description = description || equipmentType.description;
    equipmentType.purchasing_price = purchasing_price || equipmentType.purchasing_price;
    equipmentType.renting_price = renting_price || equipmentType.renting_price;
    equipmentType.category = category || equipmentType.category;
    equipmentType.equipment_image = equipment_image || equipmentType.equipment_image;
    equipmentType.skill_level = skill_level || equipmentType.skill_level;

    await equipmentType.save();
    res.json(equipmentType);
  } catch (error) {
    res.status(400).json({ error: error.message });
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

router.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const equipmentTypes = await EquipmentType.findAll({
      where: {
        name: {
          [Op.iLike]: `%${query}%`
        }
      }
    });
    res.json(equipmentTypes);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', equipmentTypeFinder, async (req, res) => {
  try {
    const equipmentType = req.equipmentType;
    const equipmentCount = await Equipment.count({
      where: {
        equipment_type_id: equipmentType.id
      }
    });
    const response = {
      equipmentType: equipmentType,
      equipmentCount: equipmentCount
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
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
