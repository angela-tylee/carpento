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

  const getCart = async () => {
    setIsLoadingCart(true);
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`
      );
      setCart(res.data.data);
      setIsLoadingCart(false);
    } catch (error) {
      console.log(error);
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
      await getCart(); // Refresh cart data after adding
      showCartDropdown();
      showMessage("success", "已加入購物車");
      setIsLoadingItem(null);
    } catch (error) {
      console.log(error);
      setIsLoadingItem(null);
    }
  };


  const showCartDropdown = () => {
    console.log("CartContext showCartDropdown()");

    if (cartDropdownRef.current) {
      cartDropdownRef.current.classList.add('cart-dropdown-visible');
      
      setTimeout(() => {
        if (cartDropdownRef.current) {
          cartDropdownRef.current.classList.remove('cart-dropdown-visible');
        }
      }, 2000);
    }    

    // if (cartDropdownRef.current) {
    //   cartDropdownRef.current.style.display = 'block'; // Show dropdown
    //   cartDropdownRef.current.style.left = 'calc(100% - 500px)'; // Show dropdown
    //   cartDropdownRef.current.style.top = '100%'; // Show dropdown
    //   setTimeout(() => {
    //     if (cartDropdownRef.current) {
    //       cartDropdownRef.current.style.display = ''; // Hide dropdown after 2 seconds
    //     }
    //   }, 2000);
    // }
  };


  useEffect(() => {
    getCart();
  }, []);

  // return { cart, isLoading, addToCart, getCart };
  return (
    <CartContext.Provider value={{ cart, isLoading: isLoadingItem, addToCart, getCart, isLoadingCart, showCartDropdown, cartDropdownRef }}>
      {children}
    </CartContext.Provider>
  );
};
