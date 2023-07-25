const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Name Is Required"],
        minlength : [2, "Name Must Be Atleast Two Character Long"]
    },
    email : {
        type : String,
        required : [true, "Email Is Required"],
        unique : true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    password : {
        type : String,
        required : [true, "Password Can't Be Empty"],
        minlength : [7, "Password Must Be Atleast Seven Character Long"]
    },
    college : {
        type : String,
        required : [true, "College Name Is Required"]
    },
    department : {
        type : String
    },
    contact : {
        type : Number,
        min : [5000000000, "Invalid Contact Number"],
        max : [9999999999, "Invalid Contact Number"],
        required : [true, "Please Provide Contact Number"]
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    isAdmin : {
        type : Boolean,
        default : false
    }
})

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    if(user){
        if(user.isVerified){
            if(user.password === password){
                return user;
            } else {
                throw new Error("Invalid Credentials")
            }
        } else {
            throw new Error("Please Verify Your Email")
        }
    } else {
        throw new Error("No Such User Found")
    }
}


const IETE = mongoose.model("data", userSchema);

module.exports = IETE;