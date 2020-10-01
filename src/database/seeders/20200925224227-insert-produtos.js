'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('produtos',
      [
        {
          nome: 'Sabonete',
          custo: 0,
          categoria: 'Gratuito',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          nome: 'Xampu',
          custo: 0,
          categoria: 'Gratuito',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          nome: 'Papel higiênico',
          custo: 0,
          categoria: 'Gratuito',
          created_at: new Date(),
          updated_at: new Date()
        },
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('produtos', null, {});

  }
};
