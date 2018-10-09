const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
let publicacaoSchema = new mongoose.Schema({
    titulo :{
        type : String,
        required : true
    },
    resumo :{
        type : String,
        required : true
    },
    conteudo :{
        type : String,
        required : true, 
    },
    idAssunto:{ 
        type: ObjectId,
        ref: 'assuntos'
    },
    idUsuario:{ 
        type: ObjectId,
        ref: 'usuarios'
    },
    areaPublica:{
        type: Boolean, 
        default:false
    },
    dataCadastro: { 
        type: Date, 
        default: Date.now 
    }
})  
module.exports = mongoose.model("publicacoes", publicacaoSchema);