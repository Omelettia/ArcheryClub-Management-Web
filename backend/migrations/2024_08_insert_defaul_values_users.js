const { Op } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert('users', [
      {
        username: 'prophet',
        name: 'The one behind the curtain',
        phonenumber: '1234567890',
        address: '123 Admin St.',
        password: 'CarpeDime',
        points: 0,
        rank: 0,
        staff: true,
        admin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'staff1',
        name: 'Regular Staff',
        phonenumber: '0987654321',
        address: '456 Staff St.',
        password: 'StaffPwd1',
        points: 0,
        rank: 0,
        staff: true,
        admin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'member1',
        name: 'Regular Member 1',
        phonenumber: '6789012345',
        address: '789 Member St.',
        password: 'RegularPwd1',
        points: 0,
        rank: 0,
        staff: false,
        admin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'member2',
        name: 'Regular Member 2',
        phonenumber: '5432109876',
        address: '987 Member St.',
        password: 'RegularPwd2',
        points: 0,
        rank: 0,
        staff: false,
        admin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('users', {
      username: {
        [Op.in]: ['prophet', 'staff1', 'member1', 'member2']
      }
    }, {});
  },
};
