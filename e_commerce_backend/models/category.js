const mongoose = require("mongoose");

categorySchema = new mongoose.Schema({
    name : {
        type : String,
        required :true,
        unique:true
    }
},{timestamps:true})

module.exports = mongoose.model('Category',categorySchema);
