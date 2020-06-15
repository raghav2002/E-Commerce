const mongoose = require("mongoose");
const {ObjectId}  = mongoose.Schema;

const ProductInCartSchema = new mongoose.Schema({
    product : {
        type:ObjectId,
        ref : "Product"
    },
    count : Number,
    name : String,
    price : Number
})

const OrderSchema = new mongoose.Schema({
    products : [],
    user : {
        type:ObjectId,
        ref:"User"
    },
    address : String,
    status : {
        type : String,
        default : "Processing",
        enum : ["Cancelled","delivered","Shipped","Processing","Received"]
    },
    transaction_id : {},
    amount : {type : Number},
    updated : Date
},{timestamps:true})

const ProductInCart = mongoose.model("ProductInCart",ProductInCartSchema);
const Order = mongoose.model("Order",OrderSchema);

module.exports = {Order,ProductInCart};