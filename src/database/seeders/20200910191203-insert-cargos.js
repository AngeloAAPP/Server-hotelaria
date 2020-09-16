'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('cargos',
      [
        {
          nome: 'Camareira',
          ramal: '111',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          nome: 'Recepcionista',
          ramal: '222',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          nome: 'Atendente de restaurante',
          ramal: '333',
          created_at: new Date(),
          updated_at: new Date()
        },
      ], {});
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('cargos', null, {});

  }
};
