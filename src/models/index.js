const sequelize = require('./db-connection');
const path = require('path');

let models = [
    'User',
    'Checking',
    'Leave',
    'Notify',
    'Contract',
    'Department'
];

let exporter = {};

exporter.sequelize = sequelize;

models.forEach((model)=>{
    exporter[model] = sequelize.import(path.join(__dirname, model + '.model'));
});

((m)=>{
    
    m.Checking.belongsTo(m.User, {foreignKey: "idUser"});
    m.User.hasMany(m.Checking, {foreignKey: 'idUser'});
    
    m.Leave.belongsTo(m.User, {foreignKey: 'idRequester'});
    m.User.hasMany(m.Leave, {foreignKey: 'idRequester'});

    m.Leave.belongsTo(m.User, {foreignKey: 'idApprover'});
    m.User.hasMany(m.Leave, {foreignKey: 'idApprover'});

    m.User.belongsToMany(m.Contract, {
        through: 'user_contract',
        timestamps: false,
        foreignKey: 'idUser'
    });
    m.Contract.belongsToMany(m.User, {
        through: 'user_contract',
        timestamps: false,
        foreignKey: 'idContract'
    });

    m.User.belongsToMany(m.Department, {
        through: 'user_department',
        timestamps: false,
        foreignKey: 'idUser'
    });
    m.Department.belongsToMany(m.User, {
        through: 'user_department',
        timestamps: false,
        foreignKey: 'idDepartment'
    });
    
})(exporter);

module.exports = exporter;