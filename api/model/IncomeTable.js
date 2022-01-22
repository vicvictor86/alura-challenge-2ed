const Model = require('./Income');
const Sequelize = require('sequelize');

module.exports = {
    async list(){
        return await Model.findAll();
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
            throw new Error("Não encontrado");
        }

        return result;
    },

    async getById(id){
        const result = await Model.FindOne({
            where : {
                id : id
            }
        });

        if(!result){
            throw new Error("Não encontrado");
        }

        return result;
    },

    async getByDescription(description){
        const result = await Model.FindOne({
            where : {
                description : description
            }
        });

        if(!result){
            throw new Error("Não encontrado");
        }

        return result;
    },

    //Tem que testar o mes e não o dia
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
            throw new Error("Não encontrado");
        }

        return result;
    },

    async insert(income){
        return await Model.create(income);
    }
}