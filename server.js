const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require("morgan");
const jwt = require('jsonwebtoken');
const app = express();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header("Access-Control-Request-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(morgan("dev"))
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

const auth = require('./routes/authentication.route.js'); 
app.use('/api/generate-token', auth);


/**
 * req.query.token: é passado o token pelo PublicationInterceptor através dos params
 * req.headers['x-acess-token']: é passado o token via postman
 */
app.use(function(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, dbConfig.secret, function(err, decoded) {      
        if (err) {
          return res.status(401).send("<h2>Error ao acessar o serviço! Falha na autênticação do Token.</h2>");    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
       return res.status(403).send("<h2>Error ao acessar o serviço! É necessário informar o Token de autenticação.</h2>");
    }
});

const publicacao = require('./routes/publicacao.route'); 
const categoria = require('./routes/categoria.route'); 
const assunto = require('./routes/assunto.route'); 
const usuario = require('./routes/usuario.route'); 

app.use('/api/publicacao', publicacao);
app.use('/api/categoria', categoria);
app.use('/api/assunto', assunto);
app.use('/api/usuario', usuario);

app.listen(3000, () => {
    console.log("Servidor NodeJS rodando na porta 3000");
});


 

