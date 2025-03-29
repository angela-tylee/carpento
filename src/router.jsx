import { createHashRouter } from 'react-router';

import FrontLayout from './layout/FrontLayout';
import AdminLayout from './layout/AdminLayout';
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
import NotFound from './pages/NotFound';

export const router = createHashRouter([
  {
    path: "/",
    element: <FrontLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "product/:id",
        element: <Product />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "blog/:id",
        element: <Blog />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "faq",
        element: <FAQ />,
      },
      {
        path: "warranty",
        element: <Warranty />,
      },
      {
        path: "return",
        element: <Return />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "checkout-success/:id",
        element: <CheckoutSuccess />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "products",
        element: <AdminProducts />,
      },
      {
        path: "orders",
        element: <AdminOrders />,
      },
      {
        path: "blogs",
        element: <AdminBlogs />,
      },
      {
        path: "coupons",
        element: <AdminCoupons />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);