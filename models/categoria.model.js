const mongoose = require('mongoose');
let categoriaSchema = new mongoose.Schema({
    descricao :{
        type : String,
        required : true, 
        unique: true
    },
    dataCadastro: { 
        type: Date, 
        default: Date.now 
    }
})  
module.exports = mongoose.model("categorias", categoriaSchema);