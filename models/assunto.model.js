const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

let assuntoSchema = new mongoose.Schema({
    descricao :{
        type : String,
        required : true
    },
    idCategoria:{ 
        type: ObjectId,
        ref: 'categorias'
    },
    areaPublica:{
        type: Boolean, 
        default:false
    },
    idUsuario:{ 
        type: ObjectId,
        ref: 'usuarios'
    },
    dataCadastro: { 
        type: Date, 
        default: Date.now 
    }
})  
module.exports = mongoose.model("assuntos", assuntoSchema);