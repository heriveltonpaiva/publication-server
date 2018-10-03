var ObjectID = require('mongodb').ObjectID;
const Usuario = require('../models/usuario.model.js');

exports.findAll = async(req, res) => {
    const usuarios = await Usuario.find().sort({'dataCadastro': -1});
    res.json(usuarios);
};

exports.findAllPagination = async(req, res) => {
    var perPage = 5;
    var page = req.params.page || 1;
    const total = await Usuario.count();
    const usuarios = await Usuario.find()
    .populate({path:'idArquivo'})
    .sort({'dataCadastro': -1})
    .skip((perPage * page) - perPage)
    .limit(perPage);
    console.log(usuarios);
    res.json({items:usuarios, pages : Math.ceil(total / perPage), total: total});
};

exports.findById = async(req, res) => {
    let id = {_id: ObjectID(req.params.id)};
    const usuario = await Usuario.findOne({_id:id})
    .populate({path:'idArquivo'})
    .catch(err => {
        throw new Error(err);
    });
    res.json(usuario);
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

exports.update = async(req, res) => {
    let id = {_id: ObjectID(req.params.id)};
     Usuario.update({_id: id}, {
     $set:{'name': req.body.name, 
           'resumo': req.body.resumo, 
           'email': req.body.email, 
           'idArquivo': req.body.idArquivo}})
     .catch(err => {
         throw new Error(err);
       });
    const usuario = await Usuario.findOne({_id:id}).populate({path:'idArquivo'});
     res.status(200).json(usuario);
 };





