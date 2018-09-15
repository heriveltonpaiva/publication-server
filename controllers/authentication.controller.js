const Usuario = require('../models/usuario.model.js');
const dbConfig = require('../config/database.config.js');
var jwt = require('jsonwebtoken');

exports.createAuthenticationTokenJWT = async(req, res) => {
    const user = await Usuario.findOne({login: req.body.login}).catch(err => {
        throw new Error(err);
    });
    if(!user){
        res.json({ success: false, message: 'Autenticação falhou. Usuário não encontrado.' });
        // check if password matches
    }else if (user.password == undefined || user.password != req.body.password) {
        res.json({ success: false, message: 'Autenticação falhou. Senha incorreta.' }); 
    }else{
        // if user is found and password is right
        // create a token with only our given payload
        // we don't want to pass in the entire user since that has the password
        const payload = {admin: user.admin };
        var token = jwt.sign(payload, dbConfig.secret, {
            algorithm: 'HS256',
            expiresIn: 606024*30 * 7 // expires in 7 days
    });
        // return the information including token as JSON
        res.json({success: true,message: 'Token:', token: token});
    }
};
