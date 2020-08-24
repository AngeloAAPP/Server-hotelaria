'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('quartos',
      [
        {
          tipo_de_quarto_id: 1,
          livre: true,
          limpo: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          tipo_de_quarto_id: 2,
          livre: true,
          limpo: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          tipo_de_quarto_id: 3,
          livre: true,
          limpo: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          tipo_de_quarto_id: 4,
          livre: true,
          limpo: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          tipo_de_quarto_id: 2,
          livre: true,
          limpo: true,
          created_at: new Date(),
          updated_at: new Date()
        },
      ], {});
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('quartos', null, {});

  }
};
