'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('quartos',
      [
        {
          tipo_de_quarto_id: 1,
          num_quarto: 11,
          livre: true,
          limpo: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          tipo_de_quarto_id: 2,
          num_quarto: 12,
          livre: true,
          limpo: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          tipo_de_quarto_id: 3,
          num_quarto: 13,
          livre: true,
          limpo: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          tipo_de_quarto_id: 4,
          num_quarto: 21,
          livre: true,
          limpo: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          tipo_de_quarto_id: 2,
          num_quarto: 22,
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
