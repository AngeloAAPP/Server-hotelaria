'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('tiposDeQuartos',
      [
        {
          nome: 'Standard casal',
          capacidade: 3,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          nome: 'Standard duplo',
          capacidade: 2,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          nome: 'Luxo casal',
          capacidade: 3,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          nome: 'Luxo duplo',
          capacidade: 2,
          created_at: new Date(),
          updated_at: new Date()
        }
      ], {});
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('tiposDeQuartos', null, {});

  }
};
