const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const Hero = sequelize.define('Hero', {
        id: {
            type: DataTypes.UUID,
            defaultValue: uuidv4(),
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
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
        tableName: 'hero',
    });


    return Hero;
};
