import { Routes, Route } from 'react-router-dom';
import AdminHeader from '../layout/AdminHeader';
import AdminSidebar from '../layout/AdminSidebar';
import Products from '../pages/admin/Products';
import Orders from '../pages/admin/Orders';
import Blogs from '../pages/admin/Blogs';
import Coupons from '../pages/admin/Coupons';

const AdminRoutes = () => {
  return (
    <div>
      <AdminHeader />
      <div className="d-flex">
        <div style={{ minWidth: '240px' }}>
          <AdminSidebar />
        </div>
        <div className="w-100 py-4 px-5">
          <Routes>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/orders" element={<Orders />}></Route>
            {/* <Route path="/blogs" element={<Blogs />}></Route> */}
            {/* <Route path="/coupons" element={<Coupons />}></Route> */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminRoutes;
