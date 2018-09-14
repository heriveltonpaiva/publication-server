var ObjectID = require('mongodb').ObjectID;
const Publicacao = require('../models/publicacao.model.js');

exports.findAll = async(req, res) => {
    const publicacoes = await Publicacao.find()
    .populate({path:'idAssunto',  populate: { path: 'idCategoria' }})
    .sort({'dataCadastro': -1});
    res.json(publicacoes);
};

exports.findById = async(req, res) => {
    console.log(req.params.id);
    let id = {_id: ObjectID(req.params.id)};
    console.log(id);
    const publicacao = await Publicacao.findOne({_id:id})
    .populate({path:'idAssunto',  populate: { path: 'idCategoria' }})
    .catch(err => {
        throw new Error(err);
    });
    res.json(publicacao);
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
          'resumo': req.body.resumo,
          'conteudo': req.body.conteudo,
          'idAssunto': req.body.idAssunto}})
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


