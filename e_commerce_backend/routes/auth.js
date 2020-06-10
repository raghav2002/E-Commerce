const express = require("express");
const routes = express.Router()
const { check, validationResult } = require('express-validator');
const {signout,signup,signin,isSignedIn} = require("../controllers/auth")

routes.post("/signup",[
    check("email").isEmail().withMessage("not a valid email"),
    check("password").isLength({min:3}).withMessage("password must be 3 char long")
    //now if any err occurs this err will be bind to req object and can access through validationResult
    //see in controller/auth.js and docs for more info.
]
,signup);

routes.post("/signin",[
    check("email").isEmail().withMessage("not a valid email"),
    check("password").isLength({min:1}).withMessage("password is not valid")
]
,signin);

routes.get("/testRoute",isSignedIn,(req,res)=>{
    res.send("okee");
})

routes.get("/signout",signout);

module.exports = routes;