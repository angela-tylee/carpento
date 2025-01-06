import { useEffect } from 'react';
import { Routes, Route, NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
// import AdminHeader from '../layout/AdminHeader';
// import AdminSidebar from '../layout/AdminSidebar';
// import Products from '../pages/admin/Products';
// import Orders from '../pages/admin/Orders';
// import Blogs from '../pages/admin/Blogs';
// import Coupons from '../pages/admin/Coupons';

const AdminRoutes = () => {
  const navigate = useNavigate();
  const params = useParams();

  console.log(params);
  function logout() {
    document.cookie = "carpento=;";
    navigate('/login');
  }

  const token = document.cookie // 取出 token
  .split('; ')
  .find((row) => row.startsWith('carpento='))
  ?.split('=')[1];

  // QUESTION: how to do this with fetchAPI? 2024-12-10
  axios.defaults.headers.common['Authorization'] = token;

  useEffect(() => {
    if(!token){
      navigate('/login');
      alert("驗證失敗，請重新登入") // TODO: Bootstrap toast & 不要顯示 admin/products 頁面
      return;
    }
    (async () => {
      try {
        await axios.post('/v2/api/user/check');
       // FIXME: 有時 post failed 403 會被踢出來 最終挑戰：路由保護 https://courses.hexschool.com/courses/react-video-course/lectures/45741598 08:00 2024-12-15
      } catch (error) {
        if(!error.response.data.success) {
          navigate('/login');
          // alert("驗證失敗，請重新登入") 
        }
      }
    })()
  },[navigate, token])


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
    <div className="dashboard">
      <header className="py-3 px-6 bg-secondary">
        <nav className="navbar navbar-expand-lg p-0 fw-normal d-flex justify-content-between">
          <div className="p-0">
            <NavLink to="/" className="navbar-brand" title="Back to homepage">
              <img src="../images/logo.png" alt="logo" width="154" />
            </NavLink>
            <p>| Dashboard</p>
          </div>
          <button className="btn p-1 nav-link" onClick={logout}>登出</button>
        </nav>
      </header>
      <div className="d-flex">
        {/* QUESTION: how does 'full-height sidebar' work with overflow, position, top? 2024-12-10 https://claude.ai/chat/7943b688-01ec-4cf1-8929-1312cccf45d3*/}
        <div className="vh-100 overflow-auto position-sticky top-0" style={{ minWidth: '240px' }}>
          <nav className="navbar navbar-expand bg-secondary d-block h-100 w-100">
            <div className="container-fluid flex-column align-items-start h-100 ps-6">
              <div id="navbarNav">
                <ul className="navbar-nav flex-column">
                  <li className="nav-item mt-3 pe-2 fw-bold">
                    <NavLink
                      to="/admin/products"
                      className="nav-link"
                      aria-current="page"
                    >
                      產品列表
                    </NavLink>
                  </li>
                  <li className="nav-item mt-3 pe-2 fw-bold">
                    <NavLink to="/admin/orders" className="nav-link">
                      訂單列表
                    </NavLink>
                  </li>
                  <li className="nav-item mt-3 pe-2 fw-bold">
                    <NavLink to="/admin/blogs" className="nav-link">
                      文章列表
                    </NavLink>
                  </li>
                  <li className="nav-item mt-3 pe-2 fw-bold">
                    <NavLink to="/admin/coupons" className="nav-link">
                      折扣碼列表
                    </NavLink>
                  </li>
                  <li className="nav-item mt-3 pe-2 fw-bold">
                    <NavLink to="/" className="nav-link">
                      回到前台<i className="bi bi-arrow-return-left ms-1 fs-7"></i>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div className="w-100 py-4 px-5">
          { token && <Outlet /> }
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
};

export default AdminRoutes;
