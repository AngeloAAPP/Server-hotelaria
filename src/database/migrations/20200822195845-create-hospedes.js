'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('hospedes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      num_passaporte: {
        type: Sequelize.STRING,
        allowNull: false
      },
      quant_adultos: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      quant_criancas: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_At: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_At: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('hospedes');
  }
};
