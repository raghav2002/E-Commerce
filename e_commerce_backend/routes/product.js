const express = require("express");
const routes = express.Router();
const {isSignedIn,isAdmin,isAuthenticated} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");
const {getProductById,createProduct,getProduct,photo,updateProduct,deleteProduct,getAllProducts,getAllUniqueCategories} = require("../controllers/product");


//all params
routes.param("userId",getUserById);
routes.param("productId",getProductById);

// create routes
routes.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct);

// read routes
routes.get("/product/:productId",getProduct)
routes.get("/product/photo/:productId",photo)
routes.get("/products",getAllProducts);
routes.get("/products/categories",getAllUniqueCategories);

//delete route
routes.delete("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct)

//update product
routes.put("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct)


module.exports = routes