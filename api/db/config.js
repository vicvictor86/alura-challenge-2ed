const Sequelize = require('sequelize');
const config = require('config');

const instance = new Sequelize({
    dialect: 'sqlite',
    storage: 'alurabudgets.sqlite'
});

module.exports = instance;