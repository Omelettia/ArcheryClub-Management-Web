const { Op } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert('users', [
      {
        username: 'prophet',
        name: 'Klein Moratti',
        phonenumber: '1234567890',
        address: '123 Admin St.',
        password: 'CarpeDime',
        points: 0,
        rank: 0,
        staff: true,
        admin: true,
        profile_image: 'https://res.cloudinary.com/dbfuwgyr8/image/upload/v1716770226/Klein_Moretti_4_ekff5k.webp',
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
        profile_image:'https://res.cloudinary.com/dbfuwgyr8/image/upload/v1716770700/a35e636384ca33276f5803f4ff558ce9_cdb6edd9000532f0f414f2243d370620-3235960020_jfegiu.jpg',
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
        profile_image:'https://res.cloudinary.com/dbfuwgyr8/image/upload/v1716770817/th-2391047050_gschxo.jpg',
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
        profile_image:'https://res.cloudinary.com/dbfuwgyr8/image/upload/v1716771049/Screenshot_2024-05-27_075019_n4ccoj.png',
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
