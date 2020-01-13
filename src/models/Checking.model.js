const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('checkings', {
        idChecking: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        date: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('checkin', 'checkout'),
            defaultValue: 'checkin',
            allowNull: false
        },
        note: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: false
        },
        report: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: false
        }
    });
}