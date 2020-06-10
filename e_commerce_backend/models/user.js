const mongoose = require('mongoose');
const crypto = require('crypto');
const uuid1 = require('uuid/v1');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        maxlength: 32,
        trim: true
    },
    encry_password : {
        type : String,
        required : true
    },

    salt : String,

    email: {
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    role : { //yeah gotch yahh😎(admin,user)
        type : Number,
        default : 0
    },
    purchases : {
        type  :Array,
        default:[]
    }
},{timestamps:true})

userSchema.virtual('password')
    .set(function(password){
        this._password = password;
        this.salt = uuid1();
        this.encry_password = this.securePassword(password);
    })
    .get(function(){
        return this._password;
    })

userSchema.methods = {
    authenticate : function(password){
        return this.securePassword(password)===this.encry_password;
    },
    securePassword : function(plainPassword){
        if(!plainPassword) return "";
        try {
            return crypto.createHmac('sha256', this.salt)
            .update(plainPassword)
            .digest('hex');
        } catch (err) {
            return "";
        }
    }
}


module.exports = mongoose.model("User",userSchema);