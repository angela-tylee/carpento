import { useEffect, useState, useContext } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import axios from 'axios';
import Message from '../components/Message';
import { MessageContext } from '../context/MessageContext';

const AdminLayout = () => {
  const navigate = useNavigate();

  const [theme, setTheme] = useState('light');
  const { messageType, message, showMessage } = useContext(MessageContext);

  function logout() {
    document.cookie = 'carpento=;';
    navigate('/login');
  }

  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('carpento='))
    ?.split('=')[1];

  axios.defaults.headers.common['Authorization'] = token;

  async function checkAdmin() {
    try {
      await axios.post('/api/user/check');
    } catch (error) {
      if (!error.response.data.success) {
        navigate('/login');
        showMessage('danger', '驗證失敗，請重新登入');
      }
    }
  }

  useEffect(() => {
    if (!token) {
      navigate('/login');
      showMessage('danger', '驗證失敗，請重新登入');
      return;
    }

    checkAdmin();
    // (async () => {
    //   try {
    //     await axios.post('/api/user/check');
    //   } catch (error) {
    //     if (!error.response.data.success) {
    //       navigate('/login');
    //       showMessage('danger', '驗證失敗，請重新登入');
    //     }
    //   }
    // })();
  }, [navigate, token]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-bs-theme', savedTheme);
      return;
    }
  }, []);

  return (
    <>
      {/* <Message type={messageType} message={message} /> */}
      <Message />
      <div className="dashboard">
        <header className="py-3 px-6 bg-secondary">
          <nav className="navbar navbar-expand-lg p-0 fw-normal d-flex justify-content-between">
            <div className="p-0">
              <NavLink to="/" className="navbar-brand" title="Back to homepage">
                <img
                  src={`${process.env.PUBLIC_URL}/images/logo${theme === 'light' ? '' : '-white'}.png`}
                  alt="logo"
                  width="154px"
                />
              </NavLink>
              <p>| Dashboard</p>
            </div>
            <button className="btn p-1 nav-link" onClick={logout}>
              {/* 登出 */}
              Sign out
            </button>
          </nav>
        </header>
        <div className="d-flex">
          <div
            className="vh-100 overflow-auto position-sticky top-0"
            style={{ minWidth: '240px' }}
          >
            <nav className="navbar navbar-expand bg-secondary d-block h-100 w-100">
              <div className="container-fluid flex-column align-items-start h-100 ps-6">
                <div id="navbarNav">
                  <ul className="navbar-nav flex-column gap-5 mt-4">
                    <li className="nav-item pe-2 fw-bold">
                      <NavLink
                        to="/admin/products"
                        className="nav-link d-inline"
                        aria-current="page"
                      >
                        {/* 產品列表 */}
                        Products
                      </NavLink>
                    </li>
                    <li className="nav-item pe-2 fw-bold">
                      <NavLink to="/admin/orders" className="nav-link d-inline">
                        {/* 訂單列表 */}
                        Orders
                      </NavLink>
                    </li>
                    <li className="nav-item pe-2 fw-bold">
                      <NavLink to="/admin/blogs" className="nav-link d-inline">
                        {/* 文章列表 */}
                        Blog
                      </NavLink>
                    </li>
                    <li className="nav-item pe-2 fw-bold">
                      <NavLink to="/admin/coupons" className="nav-link d-inline">
                        {/* 折扣碼列表 */}
                        Coupons
                      </NavLink>
                    </li>
                    <li className="nav-item pe-2 fw-bold">
                      <NavLink to="/" className="nav-link">
                        {/* 回到前台 */}
                        Home
                        <i className="bi bi-arrow-return-left ms-1 fs-7"></i>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
          <div className="w-100 py-4 px-5">{token && <Outlet />}</div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
