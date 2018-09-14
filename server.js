const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header("Access-Control-Request-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,X-HTTP-Method-Override, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(bodyParser.json({limit:'5mb'})); 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const dbConfig = require('./config/database.config.js');
mongoose.set('useCreateIndex', true);
mongoose.connect(dbConfig.url, {useNewUrlParser: true}).then(() => {
    console.log("Conectado a base de dados com sucesso.");  
}).catch(err => {
    console.log('Não foi possível conectar a base de dados. Exiting now...');
    process.exit();
});

app.get("/", function(req, res) {
    res.send("<h1>Servidor rodando com ExpressJS</h1>");
});

const publicacao = require('./routes/publicacao.route'); 
app.use('/api/publicacao', publicacao);
const categoria = require('./routes/categoria.route'); 
app.use('/api/categoria', categoria);
const assunto = require('./routes/assunto.route'); 
app.use('/api/assunto', assunto);

app.listen(3000, () => {
    console.log("Servidor NodeJS rodando na porta 3000");
});


 

