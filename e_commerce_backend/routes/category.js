const express = require("express");
const routes = express.Router();
const {getCategoryById,createCategory,getCategory,getAllCategory,updateCategory,removeCategory} = require("../controllers/category");
const {isAdmin,isAuthenticated,isSignedIn} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");

//param
routes.param("userId",getUserById);
routes.param("categoryId",getCategoryById);

// post routes
routes.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCategory)

//get routes
routes.get("/category/:categoryId",getCategory);
routes.get("/categories",getAllCategory);

//update routes
routes.put("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,updateCategory)

//delete route
routes.delete("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,removeCategory)


module.exports = routes;