import { createContext, useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { MessageContext } from './MessageContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ carts: []});
  const [isLoadingItem, setIsLoadingItem] = useState(null);
  const [isLoadingCart, setIsLoadingCart] = useState(false);
  const cartDropdownRef = useRef(null);
  const { showMessage } = useContext(MessageContext);

  const getCart = async (showLoading = false) => {
    if (showLoading) setIsLoadingCart(true);
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`
      );
      setCart(res.data.data);
      setIsLoadingCart(false);
    } catch (error) {
      setIsLoadingCart(false);
    }
  };

  const addToCart = async (productId, quantity) => {
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
      await getCart();
      showCartDropdown();
      showMessage("success", "Successfully added to Cart!");
      setIsLoadingItem(null);
    } catch (error) {
      setIsLoadingItem(null);
      showMessage("danger", "Failed. Please try again.");
    }
  };


  const showCartDropdown = () => {
    if (cartDropdownRef.current) {
      cartDropdownRef.current.classList.add('cart-dropdown-visible');
      
      setTimeout(() => {
        if (cartDropdownRef.current) {
          cartDropdownRef.current.classList.remove('cart-dropdown-visible');
        }
      }, 2000);
    }    
  };


  useEffect(() => {
    getCart(true);
  }, []);

  return (
    <CartContext.Provider value={{ cart, isLoading: isLoadingItem, addToCart, getCart, isLoadingCart, showCartDropdown, cartDropdownRef }}>
      {children}
    </CartContext.Provider>
  );
};
