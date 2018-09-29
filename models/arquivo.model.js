const mongoose = require('mongoose');
let schema = new mongoose.Schema({
    name :{
        type : String,
        required : true 
    },
    data:{ 
        type: String,
        required : true
    },
    contentType:{
        type:String,
        required : true    
    },
    size:{
        type:Number,
        required : true    
    }
})  
module.exports = mongoose.model("arquivos", schema);