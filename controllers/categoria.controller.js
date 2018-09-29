var ObjectID = require('mongodb').ObjectID;
const Categoria = require('../models/categoria.model.js');

exports.findAll = async(req, res) => {
    const categorias = await Categoria.find()
    .sort({'descricao': 1});
    res.json(categorias);
};

exports.findAllPublic = async(req, res) => {
    const categorias = await Categoria.find({areaPublica:true})
    .populate('idArquivo')
    .sort({'descricao': 1});
    res.json(categorias);
};

exports.findAllPagination = async(req, res) => {
    var perPage = 5;
    var page = req.params.page || 1;
    const total = await Categoria.count();
    const categorias = await Categoria.find()
    .sort({'descricao': 1})
    .skip((perPage * page) - perPage)
    .limit(perPage);
    res.json({items:categorias, pages : Math.ceil(total / perPage), total: total});
};

exports.findById = async(req, res) => {
    let id = {_id: ObjectID(req.params.id)};
    const categoria = await Categoria.findOne({_id:id}).catch(err => {
        throw new Error(err);
    });
    res.json(categoria);
};

exports.update = async(req, res) => {
    let id = {_id: ObjectID(req.params.id)};
     Categoria.update({_id: id}, {
     $set:{'descricao': req.body.descricao}})
     .catch(err => {
         throw new Error(err);
       });
     res.status(200).json('Categoria atualizada com sucesso.')
 };

 exports.updatePublicArea = async(req, res) => {
    let id = {_id: ObjectID(req.params.id)};
     Categoria.update({_id: id}, {
     $set:{'areaPublica': req.body.areaPublica}})
     .catch(err => {throw new Error(err);});
     res.status(200).json();
 };

exports.save = async(req, res) => {
    const novoDoc = new Categoria(req.body);
          novoDoc.privada = true;
    try {
        await novoDoc.save();
    }catch (error) {
        console.log(error.toString());
        res.status(500).json(error.toString());
    }
    res.status(200).json('Categoria cadastrada com sucesso.');
};

exports.delete = async(req, res) => {
    let id = {_id: ObjectID(req.params.id)};
    Categoria.deleteOne({_id:id}).catch(err => {
      throw new Error(err);
    });
    res.status(200).json('Categoria removida com sucesso.')
};


