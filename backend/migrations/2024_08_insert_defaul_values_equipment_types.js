const { Op } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert('equipment_types', [
      {
        name: 'Topoint T1 2023',
        description: 'For when you need to kill a bear',
        purchasing_price: 1500.00,
        renting_price: 50.00,
        category: 'Bow',
        equipment_image: 'https://res.cloudinary.com/dbfuwgyr8/image/upload/v1716904221/1A752038-8144-4E55-BF01-6322D43E1652-scaled-600x800_fdxfrh.jpg',
        skill_level: 'Intermediate',
        disabled: false,
      },
      {
        name: 'Balista',
        description: 'For siege battle',
        purchasing_price: 2000.00,
        renting_price: 100.00,
        category: 'Bow',
        equipment_image: 'https://res.cloudinary.com/dbfuwgyr8/image/upload/v1716903822/1200-510562526-ballista-weapon-1281942741_htlhte.jpg',
        skill_level: 'Beginner',
        disabled: false,
      },
      {
        name: 'Infinity gauntlet',
        description: 'For when there are too many people',
        purchasing_price: 800.00,
        renting_price: 30.00,
        category: 'Accessories',
        equipment_image: 'https://res.cloudinary.com/dbfuwgyr8/image/upload/v1716904352/MARVEL-LEGENDS-SERIES-INFINITY-GAUNTLET-oop-2-1799952682_zbsbpj.jpg',
        skill_level: 'Master',
        disabled: false,
      },
      {
        name: 'Stationary field',
        description: 'Good for beginner',
        purchasing_price: 8000.00,
        renting_price: 40.00,
        category: 'Field',
        equipment_image: 'https://res.cloudinary.com/dbfuwgyr8/image/upload/v1716904509/32340345_l-1024x681-2370390659_f8xdzl.jpg',
        skill_level: 'Beginner',
        disabled: false,
      },
      {
        name: 'Leviathan axe',
        description: 'The god of war once wields it',
        purchasing_price: 7000.00,
        renting_price: 50.00,
        category: 'Axe',
        equipment_image: 'https://res.cloudinary.com/dbfuwgyr8/image/upload/v1716904737/AXe-6-scaled-3198383970_eaazuf.jpg',
        skill_level: 'Master',
        disabled: false,
      }
    ]);
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('equipment_types', null, {});
  }
};
