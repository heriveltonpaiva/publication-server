var ObjectID = require('mongodb').ObjectID;
const Publicacao = require('../models/publicacao.model.js');

exports.findAll = async(req, res) => {
    const publicacoes = await Publicacao.find();
    res.json(publicacoes);
};

exports.save = async(req, res) => {
   const novoDoc = new Publicacao(req.body);
    await novoDoc.save();
    res.status(200).json({status:true});
};

exports.update = async(req, res) => {
   let id = {_id: ObjectID(req.params.id)};
    Publicacao.update({_id: id}, {
    $set:{'titulo': req.body.titulo, 
          'conteudo': req.body.conteudo,
          'categoria': req.body.categoria,
          'subcategoria': req.body.subcategoria}})
    .catch(err => {
        throw new Error(err);
      });
    res.status(200).json({status:true})
};

exports.delete = async(req, res) => {
    let id = {_id: ObjectID(req.params.id)};
    Publicacao.deleteOne({_id:id}).catch(err => {
      throw new Error(err);
    });
    res.status(200).json({status:true})
};


