const Model = require('./Income');
const Sequelize = require('sequelize');
const NotFound = require('../error/NotFound');
const { Op } = require('sequelize');

module.exports = {
    async list(){
        return await Model.findAll({ raw : true });
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

    async getByField(fieldName, fieldValue){
        const field = {};
        field[fieldName] = fieldValue;

        const result = await Model.FindOne({
            where : {
                field
            }
        });

        if(!result){
            throw new NotFound("Income");
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
            throw new NotFound("Income");
        }

        return result;
    },

    async getByMonth(month, year){
        if(month.length === 1){
            month = "0" + month;
        };
        return await Model.findAll({
            where : {
                [Op.and]: [
                    Sequelize.where(Sequelize.fn("strftime", "%Y", Sequelize.col("dateIncome")), year),
                    Sequelize.where(Sequelize.fn("strftime", "%m", Sequelize.col("dateIncome")), month)
                ]
            }
        });
    },

    async verifyTwoIncome(description, dateIncome){
        const monthDateIncome = dateIncome.substr(dateIncome.indexOf("-") + 1, 2);
        const result = await Model.findAll({
            where : {
                [Sequelize.Op.and]: [
                    {description : description},
                    Sequelize.where(Sequelize.fn("strftime", "%m", Sequelize.col("dateIncome")), monthDateIncome)
                ]
            }
        });

        if(!result){
            throw new NotFound("Income");
        }

        return result;
    },

    async insert(income){
        return await Model.create(income);
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