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
    },
    dataCadastro: { 
        type: Date, 
        default: Date.now 
    }
})  
module.exports = mongoose.model("publicacoes", publicacaoSchema);