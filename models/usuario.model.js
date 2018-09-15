const mongoose = require('mongoose');
let usuarioSchema = new mongoose.Schema({
    login :{
        type : String,
        required : true, 
        unique: true
    },
    password :{
        type : String,
        required : true
    },
    admin:{
        type: Boolean, 
        default:true
    },
    dataCadastro: { 
        type: Date, 
        default: Date.now 
    }
})  
module.exports = mongoose.model("usuarios", usuarioSchema);