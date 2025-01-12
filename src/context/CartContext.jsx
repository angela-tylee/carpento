import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ carts: []});
  const [isLoadingItem, setIsLoadingItem] = useState(null);

  const getCart = async () => {
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`
      );
      setCart(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (productId, quantity) => {
    console.log("CartContext addToCart()", productId, quantity);
    setIsLoadingItem(productId);
    try {
      const data = {
        data: {
          product_id: productId,
          qty: quantity,
        },
      };
      await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
        data
      );
      await getCart(); // Refresh cart data after adding
      setIsLoadingItem(null);
    } catch (error) {
      console.log(error);
      setIsLoadingItem(null);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  // return { cart, isLoading, addToCart, getCart };
  return (
    <CartContext.Provider value={{ cart, isLoading: isLoadingItem, addToCart, getCart }}>
      {children}
    </CartContext.Provider>
  );
};
