var ObjectID = require('mongodb').ObjectID;
const Assunto = require('../models/assunto.model.js');

exports.findAll = async(req, res) => {
    const assuntos = await Assunto.find().populate('idCategoria').sort({'descricao': 1});
    res.json(assuntos);
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
           'idCategoria': req.body.idCategoria}})
     .catch(err => {
         throw new Error(err);
       });
     res.status(200).json({status:true})
 };

exports.save = async(req, res) => {
    const novoDoc = new Assunto(req.body);
    await novoDoc.save();
    res.status(200).json({status:true});
};

exports.delete = async(req, res) => {
    let id = {_id: ObjectID(req.params.id)};
    Assunto.deleteOne({_id:id}).catch(err => {
      throw new Error(err);
    });
    res.status(200).json({status:true})
};


