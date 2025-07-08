import React, { useEffect, useState } from "react";
import "../CartManagement/cart.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";
import apiConfig from "../../utils/apiConfig";
import { getCart , updateCart , deleteCart} from "../../utils/constant";



function Cart() {

  const Navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const[showCheckout , setShowCheckout] = useState(false);


  useEffect(() => {
    // const savedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
    apiConfig
    .get(getCart)
    .then((response) => {
      if(response.status === 200){
        console.log("Cart item" , JSON.stringify(response.data));
        setCart(response.data)
      } else{
        console.log("..");
      }

    })
  }, []);

  const OpenCheckout = () =>{
    setShowCheckout(true);
    Navigate("/Checkout");
    
  }


  const updateQuantity = (index,amount) => {

  const item = cart[index];
  const currentQuantity = parseInt(item.cartProductQuantity);
  const newQuantity = Math.max(1,currentQuantity + amount);

  apiConfig
  .put(`${updateCart}/${item._id}`,{ quantity: String(newQuantity)})
  .then((response) =>{
    const updatedItem = response.data;
    const updatedCart = [...cart];
    updatedCart[index] = updatedItem;
    setCart(updatedCart);
  })
  .catch((error) =>{
    console.error("Update error : " , error);
    alert("Failed to update quantity");
  });
};

const removeItem =(index) => {
    const itemToDelete = cart[index];

    apiConfig
    .delete(`${deleteCart}/${itemToDelete._id}`)
    .then(() =>{
      const updatedCart = cart.filter((_, i) => i !==index);
      setCart(updatedCart);
    })
    .catch((error) => {
      console.error("Delete Error:", error);
    });
   };


const totalAmount = cart.reduce((sum, item) => {
  return sum + parseInt(item.cartProductQuantity || 1) * parseInt(item.cartProductPrice);
}, 0); 

  return (
    <>
      <div class="box">
        <h2>Your Cart</h2>
        
        <div className="cart-total">
              <h3>Total Cart Amount: ₹{totalAmount}</h3>
            </div>
            <div className="cart-footer">
        <button className="proceed-btn" onClick={ OpenCheckout}>Procced</button>
        
      </div>
        {cart.length === 0 ? (
          <p></p>
        ) : (


          <div className="cart-container">
          {cart.map((item, index) => (
            <div  key={index} className="cart-item">
              <img src={item.cartProductImgae} alt={item.productTitle}  />
              <div className="cart-item2" >
                <div>
                <h5>{item.productTitle}</h5>
                <p>Price: ₹{item.cartProductPrice}</p>
                <p className="tp">Total: ₹<span className="tp">{parseInt(item.cartProductQuantity) * parseInt(item.cartProductPrice)}</span></p>
                </div>
                <div className="quantity-controls">
                    <button onClick={() => updateQuantity(index, -1)}>-</button>
                    <span>{item.cartProductQuantity}</span>
                    <button onClick={() => updateQuantity(index, 1)}>+</button>
                  </div>
                 <p className="remove-btn" onClick={()=> removeItem(index)}>X</p>
               
                
              </div>
                  
                                 
            </div>
            
          ))}
          </div>
          
        )}
        
      </div>
      
    </>
  );
}

export default Cart;
