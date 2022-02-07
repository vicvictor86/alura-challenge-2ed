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
    
    dateExpense: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },

    category: {
        type: Sequelize.ENUM,
        values: ["Alimentação", "Saúde", "Moradia", "Transporte", "Educação", "Lazer", "Imprevisto", "Outras"],
        defaultValue: "Outras"
    }
};

const options = {
    freezeTableName: true,
    tableName: "expense",
    timestamps: true
};

module.exports = instance.define("expense", columns, options);