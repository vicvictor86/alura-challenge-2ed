const ExpenseController = require("./ExpenseController");
const IncomeController = require("./IncomeController");

class SummaryController{
    static incomeAmount(incomesMonth){
        let incomeAmount = 0;
        incomesMonth.forEach(income => {
            incomeAmount += income.value;
        });
    
        return incomeAmount;
    }

    static expenseAmount(expensesMonth) {
        let expenseAmount = 0; 
        expensesMonth.forEach(expense => {
            expenseAmount += expense.value;
        })

        return expenseAmount
    }

    static expensesByCategory(expensesMonth){
        let totalSpent = {};
        expensesMonth.forEach(expense => {
            totalSpent[expense.category] = totalSpent[expense.category] === undefined ? expense.value : totalSpent[expense.category] + expense.value;
        })
        return totalSpent;
    }

    static async getSummary(req, res, next) {
        const month = req.params.mes;
        const year = req.params.ano;

        const incomesMonth = await IncomeController.getByMonth(month, year);
        const expensesMonth = await ExpenseController.getByMonth(month, year);
        
        const incomeAmount = SummaryController.incomeAmount(incomesMonth);
        const expenseAmount = SummaryController.expenseAmount(expensesMonth);
        const balance = incomeAmount - expenseAmount;

        const expensesByCategory = SummaryController.expensesByCategory(expensesMonth);

        res.send(JSON.stringify({incomeAmount, expenseAmount, balance, expensesByCategory}));
    }
}



module.exports = SummaryController;