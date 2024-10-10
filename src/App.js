import { Routes, Route, Link } from 'react-router-dom';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Product from './pages/Product';
import Blogs from './pages/Blogs';
import Blog from './pages/Blog';
import About from './pages/About';
import FAQ from './pages/Faq';
import Warranty from './pages/Warranty';
import Return from './pages/Return';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
// import Dashboard from './pages/Dashboard';
// import Login from './pages/Login';
// import Modals from './pages/Modals';
// import ProductModal from './pages/ProductModal';
// import DeleteModal from './pages/DeleteModal';
// import CouponModal from './pages/CouponModal';
// import Message from './pages/Message';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/product" element={<Product />}></Route>
        <Route path="/blogs" element={<Blogs />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/faq" element={<FAQ />}></Route>
        <Route path="/warranty" element={<Warranty />}></Route>
        <Route path="/return" element={<Return />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
      </Routes>
      <Footer />
      {
      /* <Link to='/login'>登入</Link> |<Link to='/dashboard'>Dashboard</Link> |
      <Link to='/modal/product'>Product Modal</Link> |
      <Link to='/modal/delete'>Delete Modal</Link> |
      <Link to='/modal/coupon'>Coupon Modal</Link> |
      <Link to='/message'>Message</Link> |
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/modal' element={<Modals />}>
          <Route path='product' element={<ProductModal />}></Route>
          <Route path='delete' element={<DeleteModal />}></Route>
          <Route path='coupon' element={<CouponModal />}></Route>
        </Route>
        <Route path='/message' element={<Message />} />
      </Routes> */}
    </div>
  );
}

export default App;
