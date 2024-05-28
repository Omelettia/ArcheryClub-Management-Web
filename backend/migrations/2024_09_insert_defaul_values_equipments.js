const { Op } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert('equipments', [
      {
        state: 'Good',
        user_id: null,
        equipment_type_id: 1, // Reference to Topoint T1 2023
      },
      {
        state: 'Good',
        user_id: null,
        equipment_type_id: 2, // Reference to Balista
      },
      {
        state: 'Bad',
        user_id: null,
        equipment_type_id: 3, // Reference to Infinity gauntlet
      },
      {
        state: 'Decent',
        user_id: null,
        equipment_type_id: 4, // Reference to Stationary field
      },
      {
        state: 'Decent',
        user_id: null,
        equipment_type_id: 5, // Reference to Leviathan axe
      }
    ]);
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('equipments', {
    }, {});
  }
};
