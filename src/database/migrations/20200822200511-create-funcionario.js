'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('funcionarios', {
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
      cargo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ramal: {
        type: Sequelize.STRING,
        allowNull: false
      },
      celular: {
        type: Sequelize.STRING,
        allowNull: false
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('funcionarios');
  }
};
