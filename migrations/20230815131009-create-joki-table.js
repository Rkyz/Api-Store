'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('joki', {
      id: {
        type: Sequelize.UUID,
        defaultValue: () => uuidv4().replace(/-/g, ''),
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      login: {
        type: Sequelize.ENUM('google', 'moonton', 'vk', 'tiktok', 'facebook'),
        allowNull: false
      },
      selectedEnum: {
        type: Sequelize.STRING, // Menggunakan STRING untuk menyimpan nilai enum yang dipilih
        allowNull: true
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category: {
        type: Sequelize.ENUM('paket', 'rank', 'vk', 'gendong', 'classic'),
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('joki');
  }
};
