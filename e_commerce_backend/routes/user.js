const express = require("express");
const routes = express.Router();
const {getUserById,getUser,updateUser,userPurchaseList,pushOrderInPurchaseList} = require("../controllers/user");
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth");


routes.param("userId",getUserById)

routes.get("/user/:userId",isSignedIn,isAuthenticated,getUser)

routes.put("/user/:userId",isSignedIn,isAuthenticated,updateUser)

routes.get("/orders/user/:userId",userPurchaseList)

routes.post("/orders/push/:userId",pushOrderInPurchaseList)

module.exports = routes