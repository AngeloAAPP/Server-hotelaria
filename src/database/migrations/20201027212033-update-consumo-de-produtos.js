'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('consumo_de_produtos')
    return queryInterface.createTable(
      'consumo_de_produtos',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        produto_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        reserva_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        dia: {
          allowNull: true,
          type: Sequelize.DATE,
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
    queryInterface.dropTable('consumo_de_produtos')
    return queryInterface.createTable(
      'consumo_de_produtos',
      {
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        produto_id: {
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
      }
    );
  }
};
