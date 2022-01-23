const ExpenseTable = require('../model/ExpenseTable');
const ExistentData = require('../error/ExistentData');
const InsuficientFields = require('../error/InsuficientFields');

class IncomeController {
    constructor({id, description, value, dateExpense, createdAt, updatedAt}) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.dateExpense = dateExpense;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static async getAll(){
        return await ExpenseTable.list();
    }

    async findById(id){
        return await ExpenseTable.getById(id);
    }

    async create(){
        if(!this.description || !this.value || !this.dateExpense){
            throw new InsuficientFields();
        }

        const expenseWithSpecificDescription = await ExpenseTable.verifyTwoIncome(this.description, this.dateExpense);
        if(expenseWithSpecificDescription.length > 0){
            throw new ExistentData("Expense");
        }
        
        const result = await ExpenseTable.insert({
            description: this.description,
            value: this.value,
            dateExpense: this.dateExpense
        });

        this.id = result.id;
        this.createdAt = result.createdAt;
        this.updatedAt = result.updatedAt;
    };

    async update(){
        await ExpenseTable.getById(this.id);

        const fields = ["description", "value", "dateExpense"];
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

        await ExpenseTable.update(this.id, updateData);
    }

    async delete(){
        await ExpenseTable.delete(this.id);
    }
}

module.exports = IncomeController;