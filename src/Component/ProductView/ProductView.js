
import "../../Component/ProductView/ProductView.css";
import React, { useState } from "react";
import Head1 from "../Header/headder1/head1";
import Tophead from "../Header/tophead/tophead";
import Head2 from "../Header/headder2/Head2";
import { useLocation } from 'react-router-dom';
import apiConfig from "../../utils/apiConfig";
import {createCart } from "../../utils/constant";
import Footer from "../Footer/Foot";
import { addToCartHandler } from "../../utils/cartUtils";

function ProductView(item) {
const location = useLocation();
const [cartItem , setCartItem] = useState([]);
const [alertVisible, setAlertVisible] = useState(false);


const { state } = location;
const formItem = state?.formItem;


const addtocart = (item) => {
  addToCartHandler(item, cartItem, setCartItem);

  setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 2000);
};

    return(
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

        <Tophead/>
    <Head1/>
    <Head2/>
<div id="pv">
        <div id="ProductView">
         <div id="Productimg">
            <img src={formItem.productImage} alt=".."/>
         </div>
        <div id="productDetails">
            <h1 id="ProductName">{formItem.productTitle}</h1>
            <h5 id="ProductDescription">{formItem.productDescription}</h5>
            <span id="ProductAmount">₹{formItem.productAmount}</span>
            <span id="ProductOrginalAmount">MRP <span>₹{formItem.productOrginalAmount}</span></span>
            <span id="ProductOffer">{formItem.productOffer}</span><br/>
            <span id="inclusive">inclusive of all taxes</span><br/>
            <div id="mainsizes">
                <div id="size1">S</div>
                <div id="size2">M</div>
                <div id="size2">XL</div>
                <div id="size3">XXL</div>
            </div>
            <button className="addtocart" onClick={() => addtocart(formItem)}>
  Add
</button>
        </div>
        
        </div>
        </div>
       
        <Footer/>
        
        </>


    )

};

export default ProductView;



