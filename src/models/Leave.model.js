const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('leaves', {
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
      // 0: Ly do ca nhan
      // 1: Di cong vu
      // 2: Di cong tac
      type: DataTypes.ENUM('0', '1', '2'),
      defaultValue: '0',
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('waiting', 'approved', 'rejected', 'expired'),
      defaultValue: 'waiting',
      allowNull: false
    }
  });
}
