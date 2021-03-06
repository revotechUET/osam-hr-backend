const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('notifies', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('announce', 'notify'),
      allowNull: false,
      defaultValue: 'notify'
    },
    status: {
      type: DataTypes.ENUM('draft', 'sent'),
      allowNull: false,
      defaultValue: 'sent'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ""
    }
  });
}
