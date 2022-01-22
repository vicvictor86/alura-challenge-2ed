const IncomeTable = require('../model/IncomeTable');

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
            throw new Error("Os campos description, value e dateIncome são obrigatórios");
        }

        const incomesWithSpecificDescription = await IncomeTable.verifyTwoIncome(this.description, this.dateIncome);
        console.log(incomesWithSpecificDescription);
        if(incomesWithSpecificDescription.length > 0){
            throw new Error("Essa receita já está cadastrada");
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