const Sequelize = require('sequelize');

/*
    about role: 
        - 0: System admin. Do anything
        - 1: User that can validate request, send notify to everyone in company
        - 2: Normal user, only checkin, checkout, send request
*/

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users', {
        idUser: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        username: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: false,
            unique: 'username-unique',
            validate: {
                isValid(value) {
                    if (value.indexOf(" ") >= 0) {
                        throw new Error('Username can not have space');
                    }
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.SMALLINT,
            defaultValue: 2,
            allowNull: false
        }
    });
}