const User = require("../models/user");
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const  expressJwt = require('express-jwt');


exports.signup = (req,res)=>{   //signup route handler
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error : errors.errors[0].msg //return the very first error from all error
        })
    }
    const user = new User(req.body);
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                error : "Not able to save user to DB"
            })
        }
        res.json(user)
    })
}

exports.signin = (req,res)=>{   //singin route handler
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error : errors.errors[0].msg //return the very first error from all error
        })
    }
    const {email,password} = req.body; //destructuring

    User.findOne({email} , (err,user) =>{
        if(err || !user){
            return res.status(400).json({
                error : "Email not found 😣"
            })
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error : "Email and Password do not match"
            })
        }
        //create token         this is the payload (look down.._id:user.....)
        const token = jwt.sign({_id:user._id},process.env.SECRET)
        //put token in cookie (thanks to the cookie parser for associating cookie in res obj)
        res.cookie("token",token,{expire:new Date()+9999});

        //send response to user
        const {_id,name,email,role} = user; //destructuring
        return res.json({token,user:{_id,name,email,role}});
                        //when we simply pass the value,it automatically creates _id:_id...
    })

}

//***************************protected route**************************
exports.isSignedIn = expressJwt({
    secret : process.env.SECRET,
    userProperty : "auth",
})

//**************************custom middleware**************************
exports.isAuthenticated = (req,res,next)=>{
    let checker = req.profile && req.auth && req.profile._id==req.auth._id;
    if(!checker){
        return res.status(403).json({
            error : "ACCESS DENIED👎"
        })
    }
    next();
}

exports.isAdmin = (req,res,next)=>{
    if(req.profile.role==0){
        return res.status(403).json({
            error : "You need Admin privilege,Access Denied"
        })
    }
    next();
}
//**************************custom middleware ends**************************

exports.signout = (req,res)=>{
    res.clearCookie("token"); //clear the cookie whose name is token👨‍🦰
    res.json({
        message : "user signout successfully 🖐"
    })
}