import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-black pt-5 pb-2 text-white">
      <div className="container">
        <nav className="navbar navbar-expand p-0" data-bs-theme="dark">
          <div className="container-fluid p-0 d-flex align-items-center align-items-md-start flex-column flex-sm-row">
            <div>
              <Link to="/" className="navbar-brand">
                <img
                  src={`${process.env.PUBLIC_URL}/images/logo-white.png`}
                  alt="logo-white"
                  width="154px"
                />
              </Link>
            </div>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/faq" className="nav-link px-0 me-2 p-sm-1 text-white">
                  FAQ
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/warranty" className="nav-link px-0 me-2 p-sm-1 text-white">
                  Warranty
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/return" className="nav-link px-0 me-2 p-sm-1 text-white">
                  Return
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link px-0 me-2 p-sm-1 text-white"
                  href="mailto:support@carpento.com"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="mt-2 text-center text-md-start">
          <p className="py-1 py-sm-0">Customer service: support@carpento.com | 9AM - 5PM | MON - FRI</p>
          <p className="py-1 py-sm-0">
            No. 123, Xinyi Road, Da’an District, Taipei, Taiwan. | 10 AM - 6 PM
            | MON - SAT
          </p>
        </div>
        <div className="mt-2 mt-sm-5 text-center fw-light">
          <p>© 2025 Angela Lee. All Rights Reserved.</p>
          <p>For personal learning purposes only, not for commercial use.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
