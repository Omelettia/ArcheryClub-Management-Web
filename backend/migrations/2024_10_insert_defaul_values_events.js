const { Op } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    // Insert default events
    await queryInterface.bulkInsert('events', [
      {
        name: 'Night of the living dead',
        description: 'Can life beat death?',
        participatable: true,
        creator_id: 1, 
        event_image: 'https://res.cloudinary.com/dbfuwgyr8/image/upload/v1716946501/zombie-attack-apocalypse-photo-shoot-horror-67599138-1627742026_mkclpw.jpg',
        starting_date: new Date('2024-12-07'), 
      },
      {
        name: 'Battle royale',
        description: 'Only one will prevail',
        participatable: true,
        creator_id: 1, 
        event_image: 'https://res.cloudinary.com/dbfuwgyr8/image/upload/v1716946729/56bb30f8-95e7-4987-906d-80da7f672230_1140x641_j71o41.jpg',
        starting_date: new Date('2024-05-07'),  
      },
      {
        name: 'Inquiry of the Heavens',
        description: 'Crimson falls from the sky',
        participatable: false,
        creator_id: 1, 
        event_image: 'https://res.cloudinary.com/dbfuwgyr8/image/upload/v1716967469/tumblr_poj80sTi8A1t09a5wo1_1280_vcee8k.jpg',
        starting_date: new Date('2-05-07'),  
      },
    ]);
  },
  down: async ({ context: queryInterface }) => {
    // Remove all events
    await queryInterface.bulkDelete('events', {});
  },
};
