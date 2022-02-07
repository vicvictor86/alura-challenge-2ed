const Model = require('./Expense');
const Sequelize = require('sequelize');
const NotFound = require('../error/NotFound');
const { Op } = require('sequelize');

module.exports = {
    async list(){
        return await Model.findAll({ raw : true });
    },

    async getByField(fieldName, fieldValue){
        const field = {};
        field[fieldName] = fieldValue;

        const result = await Model.FindOne({
            where : {
                field
            }
        });

        if(!result){
            throw new NotFound("Expense");
        }

        return result;
    },

    async getById(id){
        const result = await Model.findOne({
            where : {
                id : id
            }
        });

        if(!result){
            throw new NotFound("Expense");
        }

        return result;
    },

    async getByDescription(description){
        return await Model.findAll({ 
            where: {
                description: {
                    [Op.substring]: description
                }  
            } 
        })
    },

    async verifyTwoIncome(description, dateExpense){
        const monthDateExpense = dateExpense.substr(dateExpense.indexOf("-") + 1, 2);
        const result = await Model.findAll({
            where : {
                [Sequelize.Op.and]: [
                    {description : description},
                    Sequelize.where(Sequelize.fn("strftime", "%m", Sequelize.col("dateExpense")), monthDateExpense)
                ]
            }
        });

        if(!result){
            throw new NotFound("Expense");
        }

        return result;
    },

    async insert(expense){
        return await Model.create(expense);
    },

    async update(id, incomeUpdate){
        return await Model.update(
            incomeUpdate,
            {
                where : { id : id }
            }
        );
    },

    async delete(id){
        return await Model.destroy({
            where : { id : id }
        });
    }
}