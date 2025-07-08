const mongoose = require('mongoose');

const categoryDetails = new mongoose.Schema({

        categoryName:{
            type : String,
            required : true
        }
});


module.exports = mongoose.model('CategoryDetails' , categoryDetails);