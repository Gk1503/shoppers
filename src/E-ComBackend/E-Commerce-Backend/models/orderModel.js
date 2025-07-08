const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  AddressDetails: {
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    HouseNo: { type: String, required: true },
    StreetName: { type: String, required: true },
    TownCity: { type: String, required: true },
    CountryRegion: { type: String, required: true },
    PhoneNO: { type: String, required: true },
    EmailAddress: { type: String, required: true },
    PostalCodeZip: { type: String, required: true }
  },

  CartDetails: [
    {
      ItemImage: { type: String, required: true },
      ItemPrice: { type: Number, required: true },
      ItemQuantity: { type: Number, required: true },
      ItemTotal: { type: Number, required: true }
    }
  ],

  CartItemSubTotal: { type: Number, required: true },
  CartItemTotal: { type: Number, required: true },
  CartPaymentStatus: { type: String, required: true },
  OrderStatus: { type: String, default: "Processing" }
});

module.exports = mongoose.model('OrderDetails', orderSchema);
