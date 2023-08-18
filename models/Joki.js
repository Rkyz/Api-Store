// models/joki.js
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const Joki = sequelize.define('Joki', {
        id: {
            type: DataTypes.UUID,
            defaultValue: () => uuidv4().replace(/-/g, ''), 
            primaryKey: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        login: {
            type: DataTypes.ENUM('google', 'moonton', 'vk', 'tiktok', 'facebook'),
            allowNull: false
        },
        selectedEnum: {
            type: DataTypes.STRING, // Menggunakan STRING untuk menyimpan nilai enum yang dipilih
            allowNull: true
          },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.ENUM('paket', 'rank', 'vk', 'gendong', 'classic'),
            allowNull: false
          },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'joki'
    });




    return Joki;
};
