var ObjectID = require('mongodb').ObjectID;
const Categoria = require('../models/categoria.model.js');

exports.findAll = async(req, res) => {
    const categorias = await Categoria.find();
    res.json(categorias);
};

exports.save = async(req, res) => {
    const novoDoc = new Categoria(req.body);
    await novoDoc.save();
    res.status(200).json({status:true});
};

exports.delete = async(req, res) => {
    let id = {_id: ObjectID(req.params.id)};
    Categoria.deleteOne({_id:id}).catch(err => {
      throw new Error(err);
    });
    res.status(200).json({status:true})
};


