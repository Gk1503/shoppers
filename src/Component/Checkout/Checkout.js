import React, { useEffect, useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Checkout/Checkout.css";
import Headder1 from "../Header/headder1/head1";
import Head2 from "../Header/headder2/Head2";
import Tophead from "../Header/tophead/tophead";
import Footer from "../Footer/Foot";
import { useNavigate } from "react-router-dom";
import { getCart , createOrder } from "../../utils/constant";
import apiConfig from "../../utils/apiConfig";
import OrderPDFModal from "../Checkout/InvoiceGenrate/Ig";

function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const [formData, setFormData] = useState({
    FirstName: "",
    lastName: "",
    houseno: "",
    phone: "",
    email: "",
    postalzip: "",
    state: "",
    country: "",
    streetName: "" ,
    towncity: ""
  });

  const isFormValid =() => {
    const requiredFields = [
     "firstName",
      "lastName",
      "houseno",
      "streetName",
      "state",
      "country",
      "phone",
      "email",
      "postalzip"
    ];

    for(let field of requiredFields) {
      if(!formData[field] || formData[field].trim() ===""){
        return false;
      }
    }
    return paymentMethod !== "";
  }


  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };




  const ConfirmButton = () => {
  if (!isFormValid()) {
    alert("Please Fill The Address Details");
    return;
  }

  const AddressDetails = {
    FirstName: formData.FirstName,
    LastName: formData.lastName,
    HouseNo: formData.houseno,
    StreetName: formData.streetName,
    TownCity: formData.state,
    CountryRegion: formData.country,
    PhoneNO: formData.phone,
    EmailAddress: formData.email,
    PostalCodeZip: formData.postalzip
  };

  const CartDetails = cart.map((item) => ({
   ItemImage: item.cartProductImgae || item.cartProductImage,
    // ItemTitle: item.productTitle,
    ItemPrice: parseInt(item.cartProductPrice),
    ItemQuantity: parseInt(item.cartProductQuantity || 1),
    ItemTotal: parseInt(item.cartProductPrice) * parseInt(item.cartProductQuantity || 1)
  }));

  const orderData = {
    AddressDetails,
    CartDetails,
    CartItemSubTotal: totalAmount,
    CartItemTotal: totalAmount, // you can add taxes/shipping separately if needed
    CartPaymentStatus: paymentMethod,
    OrderStatus: "Processing"
  };

  setCurrentOrder(orderData);
  setShowPdfModal(true);

  apiConfig.post(createOrder, orderData)
    .then((response) => {
      console.log("Order created:", response.data);
      alert("Order Placed Successfully");
    })
    .catch((error) => {
      console.log("Order Error:", error.response?.data || error.message);
    });
};

  useEffect(() => {
    const savedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    setCart(savedCart);

    apiConfig.get(getCart)
      .then((response) => {
        if (response.status === 200) {
          setCart(response.data);
        }
      })
      .catch((err) => console.error("Fetch cart error:", err));
  }, []);

  const totalAmount = cart.reduce((sum, item) => sum + (item.cartProductQuantity || 1) * item.cartProductPrice, 0);

  return (
    <>
      <Tophead />
      <Headder1 />
      <Head2 />
      <div className="checkout-container">
        <div className="checkout-content">
          <div className="address-form">
            <h3>Address Details</h3>
            {[{ label: "First Name", name: "firstName",  },
              { label: "Last Name", name: "lastName" },
              { label: "House No", name: "houseno" },
              { label: "Street Name", name: "streetName" },
              { label: "Town/City", name: "state" },
              { label: "Country/Region", name: "country" },
              { label: "Phone", name: "phone", type: "tel" },
              { label: "Email Address", name: "email", type: "email" },
              { label: "Postcode/Zip", name: "postalzip" }].map(({ label, name, type = "text" }) => (
                <div className="form-group" key={name}>
                  <label>{label}*</label>
                  <input type={type} name={name} className="form-control" required onChange={handleInputChange} />
                </div>
              ))}

            <div className="form-group">
              <label>Payment Method*</label>
              <select className="form-control" value={paymentMethod} onChange={handlePaymentChange}>
                <option value="">-- Select Payment Method --</option>
                <option value="Online Payment">Online Payment</option>
                <option value="Cash Payment">Cash Payment</option>
              </select>
            </div>
          </div>

          <div className="cart-payment-section">
            <h4>Your Cart</h4>
            {cart.length === 0 ? <p>No items in Cart</p> : (
              cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.cartProductImgae} alt="img" className="cart-img" />
                  <div className="cart-item-details">
                    <p className="product-name">{item.productTitle}</p>
                    <p className="product-price">₹{item.cartProductPrice}</p>
                    <p className="cart-item-quantity">Qty: {item.cartProductQuantity || 1}</p>
                    <p className="cart-total">Total: ₹{(item.cartProductQuantity || 1) * item.cartProductPrice}</p>
                  </div>
                </div>
              ))
            )}
            <div className="cart-summary">
              <p>Subtotal: <strong>₹{totalAmount}</strong></p>
              <p>Shipping: <strong>Free</strong></p>
              <p>Total: <strong>₹{totalAmount}</strong></p>
            </div>
            <button onClick={ConfirmButton} className="confirm-btn" >Place Order</button>
          </div>
        </div>
      </div>
      <OrderPDFModal show={showPdfModal} handleClose={() => setShowPdfModal(false)} order={currentOrder} />
      <Footer />
    </>
  );
}
export default Checkout;