const Sequelize = require('sequelize');
const sequelize = require('./db-connection');
const db = {
  User: sequelize.import('./User.model.js'),
  Checking: sequelize.import('./Checking.model.js'),
  Leave: sequelize.import('./Leave.model.js'),
  Notify: sequelize.import('./Notify.model.js'),
  Contract: sequelize.import('./Contract.model.js'),
  Department: sequelize.import('./Department.model.js'),
};
db.sequelize = sequelize;
db.Sequelize = Sequelize;


// relations
db.Checking.belongsTo(db.User, { foreignKey: "idUser" });
db.User.hasMany(db.Checking, { foreignKey: 'idUser' });

db.Leave.belongsTo(db.User, { foreignKey: 'idRequester' });
db.User.hasMany(db.Leave, { foreignKey: 'idRequester' });

db.Leave.belongsTo(db.User, { foreignKey: 'idApprover' });
db.User.hasMany(db.Leave, { foreignKey: 'idApprover' });

db.User.belongsTo(db.Contract, { foreignKey: 'idContract' });
db.Contract.hasMany(db.User, { foreignKey: 'idContract' });

db.User.belongsToMany(db.Department, {
  through: 'user_department',
  timestamps: false,
  foreignKey: 'idUser'
});
db.Department.belongsToMany(db.User, {
  through: 'user_department',
  timestamps: false,
  foreignKey: 'idDepartment'
});


module.exports = db;
