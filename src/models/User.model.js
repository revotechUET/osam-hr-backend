const Sequelize = require('sequelize');

/*
    about role:
        - 0: System admin. Do anything
        - 1: User that can validate request, send notify to everyone in company
        - 2: Normal user, only checkin, checkout, send request
*/

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    idUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'manager', 'user'),
      defaultValue: 'user',
      allowNull: false
    }
  });
  return User;
}
