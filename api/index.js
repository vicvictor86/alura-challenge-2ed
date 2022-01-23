const express = require('express');
const app = express();
const router = require('./routes');
const config = require('config');
const InsuficientFields = require('./error/InsuficientFields');
const ExistentIncome = require('./error/ExistentIncome');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/receitas", router);

app.use((error, req, res, next) => {
    let status = 500;

    if(error instanceof InsuficientFields){
        status = 404;
    }

    if(error instanceof ExistentIncome){
        status = 404;
    }

    res.status(status);
    res.send(JSON.stringify({ message : error.message, id : error.id }));
})

app.listen(config.get("api.port"), () => {console.log("Servidor rodando")});