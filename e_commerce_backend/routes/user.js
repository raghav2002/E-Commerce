const express = require("express");
const routes = express.Router();
const {getUserById,getUser,updateUser,userPurchaseList} = require("../controllers/user");
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth");


routes.param("userId",getUserById)

routes.get("/user/:userId",isSignedIn,isAuthenticated,getUser)

routes.put("/user/:userId",isSignedIn,isAuthenticated,updateUser)

routes.get("/orders/user/:userId",userPurchaseList)

module.exports = routes