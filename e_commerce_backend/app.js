require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path")
const fs = require("fs")  // just to debug deployment at heroku


const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const paymentBRoutes = require("./routes/paymentBRoutes");

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//**************************All Routes*************************

app.use("/api",authRoutes); //authRoutes is mounted on /api route 
app.use("/api",userRoutes);
app.use("/api",categoryRoutes)
app.use("/api",productRoutes)
app.use("/api",orderRoutes)
app.use("/api",paymentBRoutes)

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.resolve(__dirname,'../',"e_commerce_frontend","build")))
    // app.use(express.static("e_commerce_frontend/build"))

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'../',"e_commerce_frontend","build","index.html"))
    })
}

// console.log("dir ",path.resolve(__dirname));
// console.log("FE ",path.resolve(__dirname,'../',"e_commerce_frontend","build"));
// fs.readdir(path.resolve(__dirname,'../',"e_commerce_frontend"),(err,files)=>{
//     if (err) {
//         return console.log('Unable to scan directory: ' + err);
//     } 
//     //listing all files using forEach
//     files.forEach(function (file) {
//         // Do whatever you want to do with the file
//         console.log("DIR ",file); 
//     });
// })


mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log("DB CONNECTED!")
}).catch(()=>{
    console.log("Connection to DB fails");
})

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`server is running on https://localhost:${port}`);
})