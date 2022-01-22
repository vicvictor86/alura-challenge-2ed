const express = require('express');
const app = express();
const router = require('./routes');
const config = require('config');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/income", router);

app.listen(config.get("api.port"), () => {console.log("Servidor rodando")});