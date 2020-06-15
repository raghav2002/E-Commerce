const {Order,ProductInCart} = require("../models/order")
const {ObjectId} = require("mongoose").Types

exports.getOrderById = (req,res,next,id)=>{
    Order.findById(id)
    .populate("products.product","name price")
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                error : "NO order found in DB"
            })
        }
        req.order = order
        next();
    })
}

exports.createOrder = (req,res)=>{
    // req.body.order.user = ObjectId(req.profile._id+"");
    req.body.order.user = req.profile
    const order = new Order(req.body.order);
    
    order.save((err,order)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                error : "Failed to save order to DB"
            })
        }
        res.json(order);
    })
    // res.json({success : "true"})
}

exports.getAllOrders = (req,res)=>{
    Order.find()
    .populate("user","_id email name")
    .exec((err,orders)=>{
        console.log(orders);
        
        if(err){
            return res.status(400).json({
                error : "NO orders found in DB"
            })
        }
        res.json(orders)
    })
}

exports.getOrderStatus = (req,res)=>{
    res.json(Order.schema.path("status").enumValues);
}
exports.updateStatus = (req,res)=>{
    Order.update(
        {_id : req.body.orderId},
        {$set : {status : req.body.status}},
        (err,order)=>{
            if(err){
                return res.status(400).json({
                    error : "Cannot update order status"
                })
            }
            res.json(order);
        }
    )
}