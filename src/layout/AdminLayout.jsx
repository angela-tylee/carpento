import { useEffect, useState, useContext } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import axios from 'axios';
import Message from '../components/Message';
import { MessageContext } from '../context/MessageContext';
import useScrollToTop from '../hooks/useScrollToTop';

const AdminLayout = () => {
  
  useScrollToTop();

  const navigate = useNavigate();

  const [theme, setTheme] = useState('light');
  const { showMessage } = useContext(MessageContext);


  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('carpento='))
    ?.split('=')[1];

  axios.defaults.headers.common['Authorization'] = token;


  async function logout() {
  try {
    await axios.post(`/logout`);
    
    document.cookie = "carpento=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    navigate('/login');
  } catch (error) {
    console.error('Logout failed:', error);
    alert('登出失敗，請稍後再試');
  }
};

  useEffect(() => {
    if (!token) {
      showMessage('danger', '驗證失敗，請重新登入');
      setTimeout(()=> {
        navigate('/login');
      }, 2000)
      return;
    }

    async function checkAdmin() {
      try {
        await axios.post('/api/user/check');
      } catch (error) {
        if (!error.response.data.success) {
          showMessage('danger', '驗證失敗，請重新登入');
          setTimeout(()=> {
            navigate('/login');
          }, 2000)
        }
      }
    }

    checkAdmin();

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
                        Products
                      </NavLink>
                    </li>
                    <li className="nav-item pe-2 fw-bold">
                      <NavLink to="/admin/orders" className="nav-link d-inline">
                        Orders
                      </NavLink>
                    </li>
                    <li className="nav-item pe-2 fw-bold">
                      <NavLink to="/admin/blogs" className="nav-link d-inline">
                        Blog
                      </NavLink>
                    </li>
                    <li className="nav-item pe-2 fw-bold">
                      <NavLink to="/admin/coupons" className="nav-link d-inline">
                        Coupons
                      </NavLink>
                    </li>
                    <li className="nav-item pe-2 fw-bold">
                      <NavLink to="/" className="nav-link">
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
