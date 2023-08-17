const { v4: uuidv4 } = require('uuid');


module.exports = (sequelize, DataTypes) => {
    const Info = sequelize.define('Info', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            defaultValue: () => uuidv4().replace(/-/g, ''),
          },
          linkyt: {
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
          }
    }, {
        tableName: 'info'
    });

    return Info;
}
