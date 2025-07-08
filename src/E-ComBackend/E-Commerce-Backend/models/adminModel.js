const mongoose = require('mongoose');

const AdminDetails =new mongoose.Schema({

    AdminEmail : {
        type: String,
        required : true
    },

    AdminPassword : {
        type : String,
        required : true
    },

})

module.exports = mongoose.model('AdminDetails' , AdminDetails);