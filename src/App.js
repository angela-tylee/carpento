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
import CheckoutSuccess from './pages/front/CheckoutSuccess';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminBlogs from './pages/admin/AdminBlogs';
import AdminCoupons from './pages/admin/AdminCoupons';
import ScrollToTop from './utils/ScrollToTop';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className='App'>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        {/* Front Pages Routes */}
        <Route path="/" element={<FrontRoutes />}>
          <Route path="" element={<Home />}></Route>
          <Route path="products" element={<Products />}></Route>
          <Route path="product/:id" element={<Product />}></Route>
          <Route path="blogs" element={<Blogs />}></Route>
          <Route path="blog/:id" element={<Blog />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="faq" element={<FAQ />}></Route>
          <Route path="warranty" element={<Warranty />}></Route>
          <Route path="return" element={<Return />}></Route>
          <Route path="cart" element={<Cart />}></Route>
          <Route path="checkout" element={<Checkout />}></Route>
          <Route path="checkout-success/:id" element={<CheckoutSuccess />}></Route>
        </Route>

        {/* Admin Pages Routes */}
        <Route path="/admin" element={<AdminRoutes />}>
          <Route path="products" element={<AdminProducts />}></Route>
          <Route path="orders" element={<AdminOrders />}></Route>
          <Route path="blogs" element={<AdminBlogs />}></Route>
          <Route path="coupons" element={<AdminCoupons />}></Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
