const mongoose = require('mongoose');


const productDetails = new mongoose.Schema({

        productImage : {
            type : String,
            required : true
        },

        productCategory:{
             type : String,
            required : true
        },

        productTitle:{
             type : String,
            required : true
        },

        productDescription :{
             type : String,
            required : true
        },

        productOrginalAmount:{
             type : String,
            required : true
        },

        productAmount:{
             type : String,
            required : true

        },

        productOffer:{
             type : String,
            required : true
        }

});

module.exports = mongoose.model('ProductDetails' , productDetails);

