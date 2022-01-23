const router = require('express').Router();
const IncomeController = require('./controller/IncomeController');
const IncomeSerializer = require("./Serializer").IncomeSerializer;
const ExpenseSerializer = require("./Serializer").ExpenseSerializer;
const ExpenseController = require('./controller/ExpenseController')

router.get("/receitas", async (req, res) => {
    const incomes = await IncomeController.getAll();
    res.status(200);

    const serializer = new IncomeSerializer("application/json");
    res.send(serializer.serialize(incomes));
});
router.post("/receitas", async (req, res, next) => {
    const data = req.body;

    try {
        const income = new IncomeController(data);
        await income.create();
        res.status(201);

        const serializer = new IncomeSerializer("application/json");
        res.send(serializer.serialize(income));
    } catch(error) {
        next(error);
    }
});
router.get("/receitas/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const income = new IncomeController({id : id});

        const wantedIncome = await income.findById(id);

        const serializer = new IncomeSerializer("application/json");
        res.send(serializer.serialize(wantedIncome));
    } catch (error) {
        next(error);
    }
});
router.put("/receitas/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const dataReceive = req.body;
        const data = Object.assign({}, dataReceive, {id : id});

        const income = new IncomeController(data);
        await income.update();

        res.status(204);
        res.end();
    } catch (error) {
        next(error);
    }
});
router.delete("/receitas/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const income = new IncomeController({id : id});

        await income.findById(id);
        await income.delete();

        res.status(204);
        res.end();
    } catch (error) {
        next(error);
    }
});

router.get("/despesas", async (req, res) => {
    const expenses = await ExpenseController.getAll();
    res.status(200);

    const serializer = new ExpenseSerializer("application/json");
    res.send(serializer.serialize(expenses));
});
router.get("/despesas/:id", async (req, res, next) =>{
    try {
        const id = req.params.id;
        const expense = new ExpenseController({id : id});

        const wantedExpense = await expense.findById(id);

        const serializer = new ExpenseSerializer("application/json");
        res.send(serializer.serialize(wantedExpense));
    } catch (error) {
        next(error);
    }
})
router.post("/despesas", async (req, res, next) => {
    const data = req.body;

    try {
        const expense = new ExpenseController(data);
        await expense.create();
        res.status(201);

        const serializer = new ExpenseSerializer("application/json");
        res.send(serializer.serialize(expense));
    } catch(error) {
        next(error);
    }
});
router.put("/despesas/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const dataReceive = req.body;
        const data = Object.assign({}, dataReceive, {id : id});

        const expense = new ExpenseController(data);
        await expense.update();

        res.status(204);
        res.end();
    } catch (error) {
        next(error);
    }
})
router.delete("/despesas/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const expense = new ExpenseController({id : id});

        await expense.findById(id);
        await expense.delete();

        res.status(204);
        res.end();
    } catch (error) {
        next(error);
    }
})


module.exports = router;