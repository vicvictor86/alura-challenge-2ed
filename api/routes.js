const router = require('express').Router();
const IncomeController = require('./controller/IncomeController');
const ExpenseController = require('./controller/ExpenseController');
const SummaryController = require('./controller/SummaryController');

router.get("/receitas", IncomeController.getIncome);
router.post("/receitas", IncomeController.createIncome);

router.get("/receitas/:id", IncomeController.getIncomeId);
router.put("/receitas/:id", IncomeController.updateIncome);
router.delete("/receitas/:id", IncomeController.deleteIncome);

router.get("/receitas/:ano/:mes", IncomeController.getIncomeByMonth);

router.get("/despesas", ExpenseController.getExpense);
router.post("/despesas", ExpenseController.createExpense);

router.get("/despesas/:id", ExpenseController.getExpenseId);
router.put("/despesas/:id", ExpenseController.updateExpense);
router.delete("/despesas/:id", ExpenseController.deleteExpense);

router.get("/despesas/:ano/:mes", ExpenseController.getExpenseByMonth);

router.get("/resumo/:ano/:mes", SummaryController.getSummary);

module.exports = router;