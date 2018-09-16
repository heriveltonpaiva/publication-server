/**
 * @author Herivelton Paiva 
 * Classe responsável por realizar a criação do token de autenticação dos serviços REST
 * O token é criado no momento do login no sistema
 */
const Usuario = require('../models/usuario.model.js');
const dbConfig = require('../config/database.config.js');
var jwt = require('jsonwebtoken');

exports.createAuthenticationTokenJWT = async(req, res) => {
    const user = await Usuario.findOne({login: req.body.login}).catch(err => {
        throw new Error(err);
    });

    if(!user){
        res.json({ success: false, message: 'Autenticação falhou. Usuário não encontrado.' });
    }else if (user.password == undefined || user.password != require('crypto').createHash('md5').update(req.body.password).digest("hex")){
        res.json({ success: false, message: 'Autenticação falhou. Senha incorreta.' }); 
    }else{
        const payload = {user};
        const tokenJWT = jwt.sign(payload, dbConfig.secret, {
            algorithm: 'HS256',
            expiresIn: 606024*30 * 1 // expira em 1 dia
    });
        res.status(200).json({
            success: true,
            message:'Token gerado com sucesso.',
            token: tokenJWT, 
            data: {login: user.login},
            expiresIn: 1000
          });
    }
};
