import { Routes, Route, Outlet } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
// import Home from '../pages/front/Home';
// import Products from '../pages/front/Products';
// import Product from '../pages/front/Product';
// import Blogs from '../pages/front/Blogs';
// import Blog from '../pages/front/Blog';
// import About from '../pages/front/About';
// import FAQ from '../pages/front/Faq';
// import Warranty from '../pages/front/Warranty';
// import Return from '../pages/front/Return';
// import Cart from '../pages/front/Cart';
// import Checkout from '../pages/front/Checkout';

const FrontRoutes = () => {
  return (
    <div className="front-layout">
      <Header />
      <Outlet />
      {/* <div>
        <Routes>
          <Route path="/" element={<Home />}></Route>
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
      </div> */}
      <Footer />
    </div>
  );
}

export default FrontRoutes;
