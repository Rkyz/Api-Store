module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
           },
           name: {
            type: DataTypes.STRING,
            allowNull: false
           },
           creator: {
            type: DataTypes.STRING,
            allowNull: false
           },
           popularity: {
            type: DataTypes.INTEGER,
            defaultValue: 0 ,
            readOnly: true 
           },
           category: {
            type: DataTypes.ENUM('mobile', 'pc', 'voucher'),
            allowNull: false
           },
           createdAt: {
            type:DataTypes.DATE,
            allowNull: false
           },
           updatedAt: {
            type:DataTypes.DATE,
            allowNull: false
           }
    }, {
        tableName:'user'
    });

    return User;
}