const router = require('express').Router();
const IncomeController = require('./controller/IncomeController');

router.get("/", async (req, res) => {
    const incomes = await IncomeController.getAll();
    res.status(200).send(JSON.stringify(incomes));
});
router.post("/", async (req, res, next) => {
    const data = req.body;

    try {
        const income = new IncomeController(data);
        await income.create();
        res.status(201);
        res.send(JSON.stringify(income));
    } catch(error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const income = new IncomeController({id : id});

        const wantedIncome = await income.findById(id);
        res.status(200).send(JSON.stringify(wantedIncome));
    } catch (error) {
        next(error);
    }
});
router.put("/:id", async (req, res, next) => {
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
router.delete("/:id", async (req, res, next) => {
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
    
})

module.exports = router;