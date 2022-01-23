const express = require('express');
const app = express();
const router = require('./routes');
const config = require('config');
const InsuficientFields = require('./error/InsuficientFields');
const ExistentIncome = require('./error/ExistentIncome');
const NotFound = require('./error/NotFound');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/", router);

app.use((req, res, next) => {
    let reqFormat = req.header("Accept");

    if(reqFormat === "*/*"){
        reqFormat = "application/json";
    }

    if(acceptFormats.indexOf(reqFormat) === -1){
        res.status(406);
        res.end();
        return;
    }

    res.setHeader("Content-Type", reqFormat);
    next();
})

app.use((error, req, res, next) => {
    let status = 500;

    if(error instanceof InsuficientFields){
        status = 400;
    }

    if(error instanceof ExistentIncome){
        status = 400;
    }

    if(error instanceof NotFound){
        status = 404;
    }

    res.status(status);
    res.send(JSON.stringify({ message : error.message, id : error.id }));
})

app.listen(config.get("api.port"), () => {console.log("Servidor rodando")});