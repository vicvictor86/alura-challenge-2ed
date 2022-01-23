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
}

module.exports = IncomeController;