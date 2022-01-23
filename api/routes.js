const router = require('express').Router();
const IncomeController = require('./controller/IncomeController');

router.get("/", (req, res) => {
    res.send("Ok");
})

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
})

module.exports = router;