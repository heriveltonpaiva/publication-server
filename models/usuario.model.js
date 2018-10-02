const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
let usuarioSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    login:{
        type : String,
        required : true, 
        unique: true
    },
    password:{
        type : String,
        required : true
    },
    resumo:{
        type : String
    },
    email:{
        type : String,
        required : true
    },
    idArquivo: { 
        type: ObjectId, 
        ref: 'arquivos'
    },
    admin:{
        type: Boolean, 
        default:true
    },
    ativo:{
        type:Boolean,
        default:true
    },
    dataCadastro: { 
        type: Date, 
        default: Date.now 
    }
})  
module.exports = mongoose.model("usuarios", usuarioSchema);