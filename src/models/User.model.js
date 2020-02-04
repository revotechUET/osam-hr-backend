const Sequelize = require('sequelize');

/*
    about role:
        - 0: System admin. Do anything
        - 1: User that can validate request, send notify to everyone in company
        - 2: Normal user, only checkin, checkout, send request
*/

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    idGoogle: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM('admin', 'manager', 'user'),
      defaultValue: 'user',
      allowNull: false
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
  return User;
}
