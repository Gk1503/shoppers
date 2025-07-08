// src/utils/cartUtils.js

import apiConfig from "./apiConfig";
import { createCart } from "./constant";

export const addToCartHandler = async (item, cartItem, setCartItem) => {
  const isItemExists = cartItem.some((cart) => cart.productId === item.productId);

  if (isItemExists) {
    
    return;
  }

  const cartData = {
    cartProductTitle: item.productTitle,
    cartProductImgae: item.productImage,
    cartProductPrice: item.productAmount,
    cartProductQuantity: 1
  };

  try {
    console.log("Sending Cart Data:", cartData);
    const response = await apiConfig.post(createCart, cartData);
    const newCartItem = response.data;
    setCartItem((prevCart) => [...prevCart, newCartItem]);
   
  } catch (error) {
    console.error("Cart Error:", error.response?.data || error.message);
    alert("Failed to add item to cart");
  }
};
