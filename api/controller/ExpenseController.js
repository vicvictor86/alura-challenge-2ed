const ExpenseTable = require('../model/ExpenseTable');
const ExistentData = require('../error/ExistentData');
const InsuficientFields = require('../error/InsuficientFields');
const ExpenseSerializer = require("../Serializer").ExpenseSerializer;

class ExpenseController {
    constructor({id, description, value, dateExpense, category, createdAt, updatedAt}) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.dateExpense = dateExpense;
        this.category = category;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static async getAll(){
        return await ExpenseTable.list();
    }

    async getByField(fieldName, fieldValue){
        const field = {};
        field[fieldName] = fieldValue;

        const result = await Model.findAll({
            where : field
        });

        return result;
    }

    static async getByDescription(description){
        return await ExpenseTable.getByDescription(description);
    }

    async findById(id){
        return await ExpenseTable.getById(id);
    }

    static async getByMonth(month, year){
        return await ExpenseTable.getByMonth(month, year);
    }

    async create(){
        if(!this.description || !this.value || !this.dateExpense){
            throw new InsuficientFields();
        }

        const expenseWithSpecificDescription = await ExpenseTable.verifyTwoIncome(this.description, this.dateExpense);
        if(expenseWithSpecificDescription.length > 0){
            throw new ExistentData("Expense");
        }
        
        const avaibleValues = ["Alimentação", "Saúde", "Moradia", "Transporte", "Educação", "Lazer", "Imprevisto"];
        if(!avaibleValues.includes(this.category)){
            this.category = "Outras";
        }

        const result = await ExpenseTable.insert({
            description: this.description,
            value: this.value,
            dateExpense: this.dateExpense,
            category: this.category
        });

        this.id = result.id;
        this.createdAt = result.createdAt;
        this.updatedAt = result.updatedAt;
    };

    async update(){
        await ExpenseTable.getById(this.id);

        const fields = ["description", "value", "dateExpense", "category"];
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

        if(Object.keys(updateData).length < 3){
            throw new InsuficientFields();
        }

        await ExpenseTable.update(this.id, updateData);
    }

    async delete(){
        await ExpenseTable.delete(this.id);
    }

    static async getExpense(req, res){
        const description = req.query.descricao;
        let expenses;
        if(description){
            expenses = await ExpenseController.getByDescription(description);
        }else{
            expenses = await ExpenseController.getAll();
        }
        
        const serializer = new ExpenseSerializer("application/json");
        res.status(200).send(serializer.serialize(expenses));
    }

    static async createExpense(req, res, next){
        const data = req.body;

        try {
            const expense = new ExpenseController(data);
            await expense.create();
            
            const serializer = new ExpenseSerializer("application/json");
            res.status(201).send(serializer.serialize(expense));
        } catch(error) {
            next(error);
        }
    }

    static async getExpenseId(req, res, next){
        try {
            const id = req.params.id;
            const expense = new ExpenseController({id : id});
    
            const wantedExpense = await expense.findById(id);
    
            const serializer = new ExpenseSerializer("application/json");
            res.send(serializer.serialize(wantedExpense));
        } catch (error) {
            next(error);
        }
    }

    static async updateExpense(req, res, next) {
        try {
            const id = req.params.id;
            const dataReceive = req.body;
            const data = Object.assign({}, dataReceive, {id : id});
    
            const expense = new ExpenseController(data);
            await expense.update();
    
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }

    static async deleteExpense(req, res, next) {
        try {
            const id = req.params.id;
            const expense = new ExpenseController({id : id});
    
            await expense.findById(id);
            await expense.delete();
    
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }

    static async getExpenseByMonth(req, res, next){
        try{
            const year = req.params.ano;
            const month = req.params.mes;
    
            const wantedExpense = await ExpenseController.getByMonth(month, year);
    
            const serializer = new ExpenseSerializer("application/json");
            res.send(serializer.serialize(wantedExpense));
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ExpenseController;