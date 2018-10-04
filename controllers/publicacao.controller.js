var ObjectID = require('mongodb').ObjectID;
const Publicacao = require('../models/publicacao.model.js');

exports.findAll = async(req, res) => {
    const publicacoes = await Publicacao.find()
    .populate({path:'idAssunto',  populate: { path: 'idCategoria' }})
    .populate({path:'idUsuario'})
    .sort({'dataCadastro': -1});
    res.json(publicacoes);
};

/* Listagem paginada para área pública */
exports.findAllPublic = async(req, res) => {
    var perPage = 5;
    var page = req.params.page || 1;
    const total = await Publicacao.count();
    const publicacoes = await Publicacao.find({areaPublica:true})
    .populate({path:'idAssunto',  populate: { path: 'idCategoria' }})
    .populate({path:'idUsuario'})
    .sort({'dataCadastro': -1})
    .skip((perPage * page) - perPage)
    .limit(perPage);
    res.json({items:publicacoes, pages : Math.ceil(total / perPage), total: total});
};

exports.findAllPagination = async(req, res) => {
    var perPage = 5;
    var page = req.params.page || 1;
    const total = await Publicacao.count();
    const publicacoes = await Publicacao.find()
    .populate({path:'idAssunto',  populate: { path: 'idCategoria' }})
    .populate({path:'idUsuario'})
    .sort({'dataCadastro': -1})
    .skip((perPage * page) - perPage)
    .limit(perPage);
    res.json({items:publicacoes, pages : Math.ceil(total / perPage), total: total});
};

exports.findById = async(req, res) => {
    console.log(req.params.id);
    let id = {_id: ObjectID(req.params.id)};
    console.log(id);
    const publicacao = await Publicacao.findOne({_id:id})
    .populate({path:'idAssunto',  populate: { path: 'idCategoria' }})
    .populate({path:'idUsuario'})
    .catch(err => {
        throw new Error(err);
    });
    res.json(publicacao);
};

exports.findByTopic = async(req, res) => {
    let idTopic = {_id: ObjectID(req.params.id)};
    const publicacoes = await Publicacao.find({idAssunto:idTopic});
    res.json(publicacoes);
};

exports.save = async(req, res) => {
    const novoDoc = new Publicacao(req.body);
    await novoDoc.save().catch(err => {
        throw new Error(err);
    });;
    res.status(200).json('Publicação cadastrada com sucesso.');
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
    res.status(200).json('Publicação atualizada com sucesso.');
};

exports.updatePublicArea = async(req, res) => {
    let id = {_id: ObjectID(req.params.id)};
    Publicacao.update({_id: id}, {
     $set:{'areaPublica': req.body.areaPublica}})
     .catch(err => {throw new Error(err);});
     res.status(200).json();
 };

exports.delete = async(req, res) => {
    let id = {_id: ObjectID(req.params.id)};
    Publicacao.deleteOne({_id:id}).catch(err => {
      throw new Error(err);
    });
    res.status(200).json('Publicação removida com sucesso.');
};


