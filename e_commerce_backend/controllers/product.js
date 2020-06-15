const Product = require("../models/product");
const formidable  = require("formidable");
const _  = require("lodash");
const fs = require("fs");

exports.getProductById = (req,res,next,id)=>{
    Product.findById(id).
    populate("category")
    .exec((err,product)=>{
        if(err){
            return res.status(400).json({
                error : "cannot find that product"
            })
        }
        req.product = product;
        next();
    })
   
}

exports.createProduct = (req,res)=>{
    const form  = formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error : "problem with image"
            })
        }

        //check fields items
        const {name,description,price,stock,category} = fields;
        if(!name || !description || !price || !stock || !category){
            return res.status(400).json({
                error : "Please include all fields"
            })
        }
        const product = new Product(fields);

        //handle file
        if(file.photo){
            if(file.photo.size > 3000000){
                if(err){
                    return res.status(400).json({
                        error : "image is too big!"
                    })
                }
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;

        }
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error : "product saving failed"
                })
            }
            res.json(product)
        })
    })
}

exports.getProduct = (req,res)=>{
    req.product.photo  = undefined //we will render photo with middle ware otherwise it will make it very slow
    return res.json(req.product);
}

//delete controller
exports.deleteProduct = (req,res)=>{
    const product = req.product
    product.remove((err,deletedProduct)=>{
        if(err){
            return res.status(400).json({
                error : "can not delete the product"
            })
        }
        res.json({
            message : "product deleted successfully"
        })
    })
}

//update controller
exports.updateProduct = (req,res)=>{
    const form  = formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error : "problem with image"
            })
        }

        
        
        //updation code
        let product = req.product
        product = _.extend(product,fields)

        //handle file
        if(file.photo){
            if(file.photo.size > 3000000){
                if(err){
                    return res.status(400).json({
                        error : "image is too big!"
                    })
                }
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error : "product updation failed"
                })
            }
            res.json(product)
        })


    })
}

//product listing 
exports.getAllProducts = (req,res)=>{

    let limit = req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"

    Product.find()
    .select("-photo")
    .populate("category")
    .limit(limit)
    .sort([[sortBy,"asc"]]) //we place sort after limit because now we will be sorting much less data😊
    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error : "no product found"
            })
        }
        res.json(products)
    })
}

exports.getAllUniqueCategories = ()=>{ //doubt
    Product.distinct("category",{},(err,category)=>{
        if(err){
            return res.status(400).json({
                error : "NO categories found"
            })
        }
        res.json(category)
    })
}


//middle ware
exports.photo = (req,res,next)=>{
    if(req.product.photo){
        res.set("Content-Type",req.product.photo.contentType);
        res.send(req.product.photo.data)
    }
    next();
}

exports.updateStock = (req,res,next)=>{  //doubt

    let myOperation = []
     myOperation = req.body.order.products.map(prod=>{
        return {
            filter : {_id : prod._id},
            update : {$inc : {stock : -prod.count, sold : +prod.count}}
        }
    })
    console.log(myOperation);
    
    Product.bulkWrite(myOperation,{},(err,products)=>{
        if(err){
            return res.status(400).json({
                error : "bulk operation failed"
            })
        }
        next();
    })
}

