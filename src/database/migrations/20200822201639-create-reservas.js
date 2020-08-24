'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reservas', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      hospede_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'hospedes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      quarto_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'quartos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      data_inicio: {
        type: Sequelize.DATE,
        allowNull: false
      },
      data_fim: {
        type: Sequelize.DATE,
        allowNull: false
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable('reservas');
  }
};
