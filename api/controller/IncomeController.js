const IncomeTable = require('../model/IncomeTable');
const ExistentData = require('../error/ExistentData');
const InsuficientFields = require('../error/InsuficientFields');
const IncomeSerializer = require("../Serializer").IncomeSerializer;

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

    static async getByDescription(description){
        const result = await IncomeTable.getByDescription(description);

        return result;
    }

    static async getByMonth(month, year){
        return await IncomeTable.getByMonth(month, year);
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
            throw new ExistentData("Income");
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

    static async getIncome(req, res){
        const description = req.query.descricao;
        let incomes;
        if(description){
            incomes = await IncomeController.getByDescription(description);
        }else{
            incomes = await IncomeController.getAll();
        }
        
        const serializer = new IncomeSerializer("application/json");
        res.status(200).send(serializer.serialize(incomes));
    }

    static async getIncomeId(req, res, next){
        try {
            const id = req.params.id;
            const income = new IncomeController({id : id});
    
            const wantedIncome = await income.findById(id);
    
            const serializer = new IncomeSerializer("application/json");
            res.send(serializer.serialize(wantedIncome));
        } catch (error) {
            next(error);
        }
    }

    static async createIncome(req, res, next){
        const data = req.body;

        try {
            const income = new IncomeController(data);
            await income.create();
            const serializer = new IncomeSerializer("application/json");
            
            res.status(201).send(serializer.serialize(income));
        } catch(error) {
            next(error);
        }
    }

    static async updateIncome(req, res, next){
        try {
            const id = req.params.id;
            const dataReceive = req.body;
            const data = Object.assign({}, dataReceive, {id : id});
    
            const income = new IncomeController(data);
            await income.update();
    
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }

    static async deleteIncome(req, res, next){
        try {
            const id = req.params.id;
            const income = new IncomeController({id : id});
    
            await income.findById(id);
            await income.delete();
    
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }

    static async getIncomeByMonth(req, res, next){
        try{
            const year = req.params.ano;
            const month = req.params.mes;
    
            const wantedIncome = await IncomeController.getByMonth(month, year);
    
            const serializer = new IncomeSerializer("application/json");
            res.send(serializer.serialize(wantedIncome));
        } catch (error) {
            next(error);
        }
    }
}

module.exports = IncomeController;