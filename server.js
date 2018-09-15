const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const jwt = require('jsonwebtoken');

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

const auth = require('./routes/authenticate.route'); 
app.use('/api/authenticate', auth);

// route middleware to verify a token
app.use(function(req, res, next){
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {
      // verifies secret and checks exp
      jwt.verify(token, dbConfig.secret, function(err, decoded) {      
        if (err) {
          console.error(err);
          return res.status(401).send("<h2>Error ao acessar o serviço! Falha na autênticação do Token.</h2>");    
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;    
          next();
        }
      });
  
    } else {
      // if there is no token
      // return an error
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


 

