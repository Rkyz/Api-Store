const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const Game = sequelize.define('Game', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            defaultValue: () => uuidv4().replace(/-/g, ''),
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          creator: {
            type: DataTypes.STRING,
            allowNull: false
          },
          image: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          category: {
            type: DataTypes.ENUM('pc', 'mobile', 'voucher'),
            allowNull: false
          },
          type: {
            type: DataTypes.ENUM('joki', 'topup'),
            allowNull: false
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
          },
    }, {
        tableName: 'game',
    });


    return Game;
};
