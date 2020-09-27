'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('reservas', 'check_in_realizado', {
        type: Sequelize.BOOLEAN,
        allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('reservas', 'check_in_realizado');
  }
};