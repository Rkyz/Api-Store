'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('game', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: () => uuidv4().replace(/-/g, ''),
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      creator: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category: {
        type: Sequelize.ENUM('pc', 'mobile', 'voucher'),
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM('joki', 'topup'),
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('game');
  },
};
