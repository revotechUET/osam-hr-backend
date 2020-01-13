const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('leaves', {
        idLeave: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        startTime: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        endTime: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        reason: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('waiting', 'accepted', 'rejected', 'expired'),
            defaultValue: 'waiting',
            allowNull: false
        }
    });
}