const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required : true,
    },
    MobileNo:{
        type: String,
        required:true,
        unique: true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true,
        unique:true
    },
    ConfirmPassword:{
        type:String,
        required: true,
        unique:true
    }
});





module.exports = mongoose.model('User' , userSchema );


