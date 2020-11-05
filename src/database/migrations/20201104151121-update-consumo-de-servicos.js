'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('consumo_de_servicos')
    return queryInterface.createTable(
      'consumo_de_servicos',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        servico_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        reserva_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        dia: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        concluido: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('consumo_de_servicos')
    return queryInterface.createTable(
      'consumo_de_servicos',
      {
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        servico_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        reserva_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        dia: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        concluido: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
        },
      }
    );
  }
};
