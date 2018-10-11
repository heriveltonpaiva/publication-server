// npm install express body-parser mongoose morgan express-fileupload jsonwebtoken --save
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
// Necessária para carregar o arquivo do fileupload
const fileUploadDependencia = require('express-fileupload');
const app = express();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header("Access-Control-Request-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(compression());
app.use(bodyParser.json({limit:'5mb'})); 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileUploadDependencia());

const dbConfig = require('./config/database.config.js');
mongoose.set('useCreateIndex', true);
mongoose.connect(dbConfig.url, {useNewUrlParser: true}).then(() => {
    console.log("Conectado a base de dados com sucesso.");  
}).catch(err => {
    console.log('Não foi possível conectar a base de dados. Exiting now...'+err);
    process.exit();
});

app.get("/", function(req, res) {
    res.send("<h1>Servidor rodando com ExpressJS</h1>");
});

/* Serviços públicos que não passam pela autenticação JWT  */
const auth = require('./routes/authentication.route.js'); 
app.use('/api/generate-token', auth);
const public = require('./routes/public.route.js');
app.use('/api/public', public);

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

/** Serviços privados que necessitam do token de autenticação */
const publicacao = require('./routes/publicacao.route'); 
const categoria = require('./routes/categoria.route'); 
const assunto = require('./routes/assunto.route'); 
const usuario = require('./routes/usuario.route'); 
const fileUpload = require('./routes/fileupload.route'); 

app.use('/api/fileupload', fileUpload);
app.use('/api/publicacao', publicacao);
app.use('/api/categoria', categoria);
app.use('/api/assunto', assunto);
app.use('/api/usuario', usuario);

app.listen(3000, () => {
    console.log("Servidor NodeJS rodando na porta 3000");
});


 

