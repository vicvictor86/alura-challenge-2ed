const IncomeTable = require('../model/IncomeTable');
const ExistentIncome = require('../error/ExistentIncome');
const InsuficientFields = require('../error/InsuficientFields');

class IncomeController {
    constructor({id, description, value, dateIncome, createdAt, updatedAt}) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.dateIncome = dateIncome;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static async getAll(){
        return await IncomeTable.list();
    }

    async findById(id){
        return await IncomeTable.getById(id);
    }

    async create(){
        if(!this.description || !this.value || !this.dateIncome){
            throw new InsuficientFields();
        }

        const incomesWithSpecificDescription = await IncomeTable.verifyTwoIncome(this.description, this.dateIncome);
        if(incomesWithSpecificDescription.length > 0){
            throw new ExistentIncome();
        }
        
        const result = await IncomeTable.insert({
            description: this.description,
            value: this.value,
            dateIncome: this.dateIncome
        });

        this.id = result.id;
        this.createdAt = result.createdAt;
        this.updatedAt = result.updatedAt;
    };

    async update(){
        await IncomeTable.getById(this.id);

        const fields = ["description", "value", "dateIncome"];
        const updateData = {};

        fields.forEach((field) => {
            const value = this[field];

            if(field === "value"){
                if(typeof value === "number" && value > 0){
                    updateData[field] = value;
                }else{
                    throw new Error("The field value has to be a number and bigger than zero");
                } 
            } 

            if(typeof value === "string"){
                if(value.length > 0){
                    updateData[field] = value;
                }else{
                    throw new Error("The field has to be a text and cannot be empty");
                }
            }
        });

        if(Object.keys(updateData).length !== 3){
            throw new InsuficientFields();
        }

        await IncomeTable.update(this.id, updateData);
    }

    async delete(){
        await IncomeTable.delete(this.id);
    }
}

module.exports = IncomeController;