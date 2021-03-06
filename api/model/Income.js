const Sequelize = require('sequelize');
const instance = require('../db/config');

const columns = {
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },

    value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },

    dateIncome: {
        type: Sequelize.DATEONLY,
        allowNull: false
    }
};

const options = {
    freezeTableName: true,
    tableName: "income",
    timestamps: true
};

module.exports = instance.define("income", columns, options);