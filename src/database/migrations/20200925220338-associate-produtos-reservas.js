'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Product belongsToMany Tag
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
  },

  down: (queryInterface, Sequelize) => {
    // remove table
    return queryInterface.dropTable('consumo_de_produtos');
  },
};