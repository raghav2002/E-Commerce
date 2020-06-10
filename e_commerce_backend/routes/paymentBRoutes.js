const express = require("express")
const routes = express.Router();
const {isSignedIn,isAuthenticated} = require("../controllers/auth");
const {getToken,processPayment} = require("../controllers/paymentB")
const {getUserById} = require("../controllers/user");

routes.param("userId",getUserById)

routes.get("/payment/gettoken/:userId",isSignedIn,isAuthenticated,getToken)

routes.post("/payment/braintree/:userId",isSignedIn,isAuthenticated,processPayment)



module.exports = routes