const mongoose = require('mongoose');

const cartDetails = new mongoose.Schema({

    cartProductTitle:{
        type : String,
        required : true
    },

    cartProductImgae:{
        type : String,
        
    },

    cartProductPrice:{
        type : String,
        required : true
    },

    cartProductQuantity:{
        type : String,
        required : true
    },

    cartProductTotalAmount:{
        type : String,
        required : true
    },

    // cartProductId : {
    //     type: String,
    //     required : true
    // }
});

module.exports = mongoose.model('CartDetails', cartDetails);