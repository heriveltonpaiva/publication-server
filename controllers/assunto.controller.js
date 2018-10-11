var ObjectID = require('mongodb').ObjectID;
const Assunto = require('../models/assunto.model.js');

exports.findAll = async(req, res) => {
    const assuntos = await Assunto.find().populate('idCategoria').sort({'descricao': 1});
    res.json(assuntos);
};

exports.findAllPublic = async(req, res) => {
    const assuntos = await Assunto.find({areaPublica:true}).populate('idCategoria').sort({'descricao': 1});
    res.json(assuntos);
};

exports.findAllPagination = async(req, res) => {
    var perPage = 5;
    var page = req.params.page || 1;
    const total = await Assunto.countDocuments();
    const assuntos = await Assunto.find().populate('idCategoria')
    .sort({'descricao': 1})
    .skip((perPage * page) - perPage)
    .limit(perPage);
    res.json({items:assuntos, pages : Math.ceil(total / perPage), total: total});
};

exports.findByCategory = async(req, res) => {
    let idCategory = {_id: ObjectID(req.params.id)};
    const assuntos = await Assunto.find({idCategoria:idCategory});
    res.json(assuntos);
};

exports.findById = async(req, res) => {
    let id = {_id: ObjectID(req.params.id)};
    const assunto = await Assunto.findOne({_id:id}).catch(err => {
        throw new Error(err);
    });
    res.json(assunto);
};

exports.update = async(req, res) => {
    let id = {_id: ObjectID(req.params.id)};
    Assunto.update({_id: id}, {
     $set:{'descricao': req.body.descricao,
           'privada': req.body.privada,
           'idCategoria': req.body.idCategoria}})
     .catch(err => {
         throw new Error(err);
       });
    res.status(200).json('Assunto atualizado com sucesso.')
 };

 exports.updatePublicArea = async(req, res) => {
    let id = {_id: ObjectID(req.params.id)};
    Assunto.update({_id: id}, {
     $set:{'areaPublica': req.body.areaPublica}})
     .catch(err => {throw new Error(err);});
     res.status(200).json();
 }; 

exports.save = async(req, res) => {
    const novoDoc = new Assunto(req.body);
    await novoDoc.save();
    res.status(200).json('Assunto cadastrado com sucesso.')
};

exports.delete = async(req, res) => {
    let id = {_id: ObjectID(req.params.id)};
    Assunto.deleteOne({_id:id}).catch(err => {
      throw new Error(err);
    });
    res.status(200).json('Assunto removido com sucesso.')
};


