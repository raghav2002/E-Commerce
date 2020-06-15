const User = require("../models/user");
const {Order} = require("../models/order");

 exports.getUserById = (req,res,next,id)=>{ //id is given by params
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error : "no user found in DB"
            })
        }
        req.profile = user //just add a profile field in req obj
        next(); //I almost forgot that (** it is also imp to place next() here and not below line 12 bcoz this will start asyn call)
    })
}

exports.getUser = (req,res)=>{
    //disable crucial info
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined
    return res.json(req.profile);
}

exports.updateUser = (req,res)=>{
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set : req.body},
        {new:true,useFindAndModify : false},
    ).exec((err,user)=>{
        if(err){
            return res.status(400).json({ //TODO  : change status code
                error : "you can't change"
            })
        }
        //disable crucial info
        req.profile.salt = undefined;
        req.profile.encry_password = undefined;
        req.profile.createdAt = undefined;
        req.profile.updatedAt = undefined
        return res.json(user)
    })
    
}


exports.userPurchaseList = (req,res)=>{
    Order.find({user:req.profile._id}).
    populate("user","_id name").
    exec((err,order)=>{
        if(err){
            return res.status(400).json({
                error : "No Orders found"
            })
        }
        return res.json(order)

    })
}

/****************middle ware**************************/
exports.pushOrderInPurchaseList = (req,res,next)=>{
    
    let purchases = []
    
    req.body.products.forEach(product=>{
        purchases.push({
            _id : product._id,
            name : product.name,
            description : product.description,
            category : product.category,    
            quantity : product.quantity,
            amount : product.price,
            transaction_id : req.body.transaction_id
        })
    })

    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$push : {purchases : purchases}},
        {new : true},
        (err,purchases)=>{
            if(err){
                return res.status(400).json({
                    error : "Unable to save purchase list"
                })
            }
        }
    )
    return next()
}







