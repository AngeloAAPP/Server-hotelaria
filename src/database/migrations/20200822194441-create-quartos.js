'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('quartos', {
      num_quarto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      tipo_de_quarto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          //model = nome da tabela que ele se relaciona
          model: 'tiposDeQuartos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      livre: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      limpo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
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
    await queryInterface.dropTable('quartos');
  }
};
