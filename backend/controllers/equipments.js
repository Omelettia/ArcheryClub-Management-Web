const router = require('express').Router();
const { tokenExtractor,isStaff } = require('../util/middleware');
const { User, EquipmentType, Equipment } = require('../models');
router.get('/', async (req, res) => {
  try {
    const equipments = await Equipment.findAll({
      attributes: { exclude: ['userId'] },
      include: [
        {
          model: User,
          attributes: ['name']
        },
        {
          model: EquipmentType,
          attributes: ['name', 'category', 'rentingPrice']
        }
      ]
    });
    res.json(equipments);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', tokenExtractor,isStaff, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);

    const equipmentType = await EquipmentType.findByPk(req.body.equipmentTypeId);
    if (!equipmentType) {
      return res.status(400).json({ error: 'Invalid equipment type' });
    }

    const equipment = await Equipment.create({
      ...req.body,
      userId: user.id,
      equipmentTypeId: equipmentType.id
    });
    res.json(equipment);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: 'Invalid data' });
  }
});

const equipmentFinder = async (req, res, next) => {
  try {
    req.equipment = await Equipment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name']
        },
        {
          model: EquipmentType,
          attributes: ['name', 'category', 'rentingPrice']
        }
      ]
    });
    if (!req.equipment) {
      return res.status(404).json({ error: 'Equipment not found' });
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

router.get('/:id', equipmentFinder, async (req, res) => {
  res.json(req.equipment);
});

router.delete('/:id', tokenExtractor, equipmentFinder,isStaff, async (req, res) => {
  try {
    await req.equipment.destroy();
    res.status(204).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
