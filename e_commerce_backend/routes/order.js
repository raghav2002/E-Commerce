const express = require("express");
const routes = express.Router();
const {isSignedIn,isAdmin,isAuthenticated} = require("../controllers/auth");
const {getUserById,pushOrderInPurchaseList} = require("../controllers/user");
const {updateStock} = require("../controllers/product")
const {getOrderById,createOrder,getAllOrders,getOrderStatus,updateStatus} = require("../controllers/order")


//params
routes.param("userId",getUserById);
routes.param("orderId",getOrderById);

//create
// routes.post("/order/create/:userId",isSignedIn,isAuthenticated,updateStock,createOrder)
routes.post("/order/create/:userId",isSignedIn,isAuthenticated,createOrder)


//read
routes.get("/order/all/:userId",isSignedIn,isAuthenticated,isAdmin,getAllOrders)

//status of order
routes.get("/order/status/:userId",isSignedIn,isAuthenticated,isAdmin,getOrderStatus)
routes.put("/order/:orderId/status/:userId",isSignedIn,isAuthenticated,isAdmin,updateStatus)

module.exports = routes