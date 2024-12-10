import { Routes, Route } from 'react-router-dom';
import FrontRoutes from './routes/FrontRoutes';
import AdminRoutes from './routes/AdminRoutes';
import Login from './pages/Login';
import Home from './pages/front/Home';
import Products from './pages/front/Products';
import Product from './pages/front/Product';
import Blogs from './pages/front/Blogs';
import Blog from './pages/front/Blog';
import About from './pages/front/About';
import FAQ from './pages/front/Faq';
import Warranty from './pages/front/Warranty';
import Return from './pages/front/Return';
import Cart from './pages/front/Cart';
import Checkout from './pages/front/Checkout';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
// import Blogs from './pages/admin/Blogs';
// import Coupons from './pages/admin/Coupons';

import { useEffect } from 'react';
import axios from 'axios';

function App() {

  useEffect(() => {
    // console.log(process.env.REACT_APP_API_URL, process.env.REACT_APP_API_PATH);
    (async () => {
      const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products/all`);
      console.log(res);
    })()
  })

  return (
    <div className='App'>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        {/* Front Pages Routes */}
        <Route path="/" element={<FrontRoutes />}>
          <Route path="" element={<Home />}></Route>
          <Route path="products" element={<Products />}></Route>
          <Route path="product" element={<Product />}></Route>
          <Route path="blogs" element={<Blogs />}></Route>
          <Route path="blog" element={<Blog />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="faq" element={<FAQ />}></Route>
          <Route path="warranty" element={<Warranty />}></Route>
          <Route path="return" element={<Return />}></Route>
          <Route path="cart" element={<Cart />}></Route>
          <Route path="checkout" element={<Checkout />}></Route>
        </Route>

        {/* Admin Pages Routes */}
        <Route path="/admin" element={<AdminRoutes />}>
          <Route path="products" element={<AdminProducts />}></Route>
          <Route path="orders" element={<AdminOrders />}></Route>
          {/* <Route path="blogs" element={<Blogs />}></Route> */}
          {/* <Route path="coupons" element={<Coupons />}></Route> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
