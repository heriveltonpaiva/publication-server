var ObjectID = require('mongodb').ObjectID;
const Assunto = require('../models/assunto.model.js');

exports.findAll = async(req, res) => {
    const assuntos = await Assunto.find().populate('idCategoria');
    res.json(assuntos);
};

exports.findByCategory = async(req, res) => {
    let idCategory = {_id: ObjectID(req.params.id)};
    const assuntos = await Assunto.find({idCategoria:idCategory});
    res.json(assuntos);
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


