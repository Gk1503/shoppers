import React, { useEffect, useState } from "react";
import "../ProductDisplay/Pd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../Checkout/Checkout";
import apiConfig from "../../utils/apiConfig";
import { getProducts , createCart } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import { addToCartHandler } from "../../utils/cartUtils";






function ProductDisplay() {
  const [productList, setProductList] = useState([]);
  const [cartItem , setCartItem] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    apiConfig
    .get(getProducts)
    .then((response) => {
        if(response.status === 200){
          console.log("Product List" , JSON.stringify(response.data));
          setProductList(response.data)
        } else {
          console.log("Hello ");
        }
        
    })

  },[]);

  const chunkArray = (array, size) => {
  const chunkedArr = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArr.push(array.slice(i, i + size));
  }
  return chunkedArr;
};


  // const addtocart = (item) => {
  
  //  const isItemExists = cartItem.some((cartItem) =>  cartItem.productId === item.productId);
  
  //  if(isItemExists){
  //   alert("Item already in the cart");
  //  }
  //  const cartData = {
  //     cartProductTitle: item.productTitle,
  //     cartProductImgae: item.productImage,
  //     cartProductPrice: item.productAmount,
  //     cartProductQuantity : 1 
  //   };

   
  //   // console.log("Sending Form Data", cartData);
  //   apiConfig
  //   .post(createCart, cartData)
  //   .then((response) => {
  //     const newCartItem = response.data;
  //     setCartItem((prevCart) => [...prevCart, newCartItem]);
  //     alert("Item added to cart.");
  //   })
  //   .catch((error) => {
  //     console.error("Cart Error", error.response?.data || error.message);
  //     alert("Failed to add item to cart");
  //   })
  // };    
const addtocart = (item) => {
  addToCartHandler(item, cartItem, setCartItem);


   setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 2000);

};

  const ProductView = (item) =>{

    navigate('/ProductView',{
      state:{formItem:item}

      
    });

  };


  return (
    <>

    {alertVisible && (
        <div
          className="alert alert-success"
          role="alert"
          style={{
            position: "fixed",
            top: "80px",
            right: "20px",
            zIndex: 999,
          }}
        >
          Item added to cart successfully!
        </div>
      )}

    
  <div id="productdisplaymain" >
    {chunkArray(productList, 4).map((row, rowIndex) => (
      <div  id="productdisplayr1" key={rowIndex}>
        {row.map((item) => (
          <div className="Product" key={item.productId} >
            <div className="card">
              <img src={item.productImage} className="card-img-top" alt="..." onClick={() => ProductView(item)}/>
              <div className="card-body">
                <h5 className="card-title">{item.productTitle}</h5>
                <h6>{item.productDescription}</h6>
                <button className="Danger">Limited time deal</button>
                <h3>
                  <sup>₹</sup>
                  {item.productAmount}
                </h3>
                <span className="discount">
                  M.R.P: <span className="Amount">{item.productOrginalAmount}</span>
                </span>
                <span className="offers">{item.productOffer}</span>
                
                <br />
               <button className="addtocart2" onClick={() => addtocart(item)}>
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>


     
    </>
  );
}

export default ProductDisplay;
