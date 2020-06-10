const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
        required:true,
        trim:true
    },
    category : {
        type:ObjectId,
        ref : "Category",
        required : true
    },
    stock : {
        type :Number
    },
    sold:{
        type:Number,
        default : 0
    },
    photo : {
        data : Buffer,
        contentType : String //jpeg,jpg...(we will set that with formidable)
    }
},{timestamps:true})

module.exports = mongoose.model("Product",productSchema);
