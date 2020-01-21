const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('checkings', {
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    checkinTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true
    },
    checkoutTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    // type: {
    //   type: DataTypes.ENUM('checkin', 'checkout'),
    //   defaultValue: 'checkin',
    //   allowNull: false
    // },
    reportContent: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false
    },
    responseContent: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false
    },
    reportStatus: {
      type: DataTypes.ENUM("none", "reported", "done"),
      defaultValue: "none",
      allowNull: false
    }
  }, { timestamps: false });
}
