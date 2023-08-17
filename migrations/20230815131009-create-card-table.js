'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('card', {
       id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
       },
       name: {
        type: Sequelize.STRING,
        allowNull: false
       },
       creator: {
        type: Sequelize.STRING,
        allowNull: false
       },
       popularity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        readOnly: true 
       },
       category: {
        type: Sequelize.ENUM('mobile', 'pc', 'voucher'),
        allowNull: false
       },
       createdAt: {
        type:Sequelize.DATE,
        allowNull: false
       },
       updatedAt: {
        type:Sequelize.DATE,
        allowNull: false
       }
      });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('card');
  }
};
