const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
let categoriaSchema = new mongoose.Schema({
    descricao :{
        type : String,
        required : true, 
        unique: true
    },
    areaPublica:{
        type: Boolean, 
        default:false
    },
    idUsuario:{ 
        type: ObjectId,
        ref: 'usuarios'
    },
    idArquivo: { 
        type: ObjectId, 
        ref: 'arquivos'
    }
})  
module.exports = mongoose.model("categorias", categoriaSchema);