import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCart = async () => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/cart`
    );
    console.log(res.data.data);
    setCart(res.data.data);
  };

  const getOrders = async () => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/orders`
    );
    console.log(res);
  };

  useEffect(() => {
    getCart();
    getOrders();
  }, []);

  return (
    <main className="container mb-7"></main>
  );
};

export default Checkout;
