const Sequelize = require('sequelize');
const config = require('config');

let mysqlConfig = config.mysql || {};

const dbConfig = {
    host: process.env.DB_HOST || mysqlConfig.host || 'localhost',
    port: process.env.DB_PORT || mysqlConfig.port || 3306,
    user: process.env.DB_USER || mysqlConfig.user || 'root',
    password: process.env.DB_password || mysqlConfig.password || '123456',
    dialect: process.env.DB_DIALECT || mysqlConfig.dialect || 'mysql',
    database: process.env.DB_DATABASE || mysqlConfig.database || 'osam-hr'
};

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: false,
    pool: {
        max: 3,
        min: 0,
        idle: 10000
    },
    storage: process.env.DB_STORAGE || dbConfig.storage
});

sequelize.sync()
    .catch(function (err) {
        console.log(err);
    });

module.exports = sequelize;