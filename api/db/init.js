const incomeTable = require("../model/Income");
const expenseTable = require("../model/Expense");

incomeTable
    .sync()
    .then(() => console.log("Tabela de receitas criada com sucesso"))
    .catch(console.log);

expenseTable
    .sync()
    .then(() => console.log("Tabela de despesas criada com sucesso"))
    .catch(console.log);