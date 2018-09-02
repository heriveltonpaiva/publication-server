const mongoose = require('mongoose');

let publicacaoSchema = new mongoose.Schema({
    titulo :{
        type : String,
        required : true, 
        unique: true
    },
    resumo :{
        type : String,
        required : true, 
        unique: true
    },
    conteudo :{
        type : String,
        required : true, 
    },
    categoria :{
        type : String,
        required : true, 
    },
    subcategoria :{
        type : String,
        required : true, 
    }
})  
module.exports = mongoose.model("publicacoes", publicacaoSchema);