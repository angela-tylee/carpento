import { Routes, Route, Link, Outlet } from 'react-router-dom';
// import AdminHeader from '../layout/AdminHeader';
// import AdminSidebar from '../layout/AdminSidebar';
// import Products from '../pages/admin/Products';
// import Orders from '../pages/admin/Orders';
// import Blogs from '../pages/admin/Blogs';
// import Coupons from '../pages/admin/Coupons';

const AdminRoutes = () => { 
  return (
    // <div>
    //   <AdminHeader />
    //   <div className="d-flex">
    //     <div style={{ minWidth: '240px' }}>
    //       <AdminSidebar />
    //     </div>
    //     <div className="w-100 py-4 px-5">
    //       <Routes>
    //         <Route path="/products" element={<Products />}></Route>
    //         <Route path="/orders" element={<Orders />}></Route>
    //         <Route path="/blogs" element={<Blogs />}></Route>
    //         <Route path="/coupons" element={<Coupons />}></Route>
    //       </Routes>
    //     </div>
    //   </div>
    // </div>
    <div>
        <header className="py-3 px-6 bg-secondary">
      <nav className="navbar navbar-expand-lg p-0 fw-normal">
        <div className="p-0">
          <Link to="/" className="navbar-brand"><img src="../images/logo.png" alt="logo" width="154" /></Link>
          <p>| Dashboard</p>
        </div>
      </nav>
    </header>
    <div className="d-flex">
      <div style={{ minWidth: '240px' }}>
      <nav className="navbar navbar-expand bg-secondary d-block vh-100 w-100">
      <div className="container-fluid flex-column align-items-start h-100 ps-6">
        <div id="navbarNav">
          <ul className="navbar-nav flex-column vh-100">
            <li className="nav-item mt-3 pe-2">
              <Link to="/admin/products" className="nav-link active" aria-current="page">產品列表</Link>
            </li>
            <li className="nav-item mt-3 pe-2">
              <Link to="/admin/orders" className="nav-link">訂單列表</Link>
            </li>
            <li className="nav-item mt-3 pe-2">
              <Link to="/admin/blogs" className="nav-link">文章列表</Link>
            </li>
            <li className="nav-item mt-3 pe-2">
              <Link to="/admin/coupons" className="nav-link">折扣碼列表</Link>
            </li>
            <li className="nav-item mt-3 pe-2">
              <Link to="/" className="nav-link">回到前台</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
      </div>
      <div className="w-100 py-4 px-5">
        <Outlet />
        {/* <Routes>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
          <Route path="/blogs" element={<Blogs />}></Route>
          <Route path="/coupons" element={<Coupons />}></Route>
        </Routes> */}
      </div>
    </div>
  </div>
  );
}

export default AdminRoutes;
