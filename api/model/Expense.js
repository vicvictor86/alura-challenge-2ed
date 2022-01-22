const Sequelize = require('sequelize');
const instance = require('../db/config');

const columns = {
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },

    value: {
        type: Sequelize.INTEGER,
        allowNull: false
    }    
};

const options = {
    freezeTableName: true,
    tableName: "expense",
    timestamps: true
};

module.exports = instance.define("expense", columns, options);