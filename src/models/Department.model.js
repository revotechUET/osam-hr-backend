const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('departments', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'department-name'
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      allowNull: false,
      defaultValue: "active"
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
}
