const Usuario = require('../models/usuario.model.js');

exports.findAll = async(req, res) => {
    const usuarios = await Usuario.find().sort({'dataCadastro': -1});
    res.json(usuarios);
};

exports.save = async(req, res) => {
    //converter senha para MD5
    req.body.password = require('crypto').createHash('md5').update(req.body.password).digest("hex");
    const novoDoc = new Usuario(req.body);
    try {
        await novoDoc.save();
    }catch (error) {
        console.log(error.toString());
        res.status(500).json(error.toString());
    }
    console.log('Usuário salvo com sucesso.');
    res.status(200).json({status:true});
};





