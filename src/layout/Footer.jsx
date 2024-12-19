// import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-light pt-5 pb-2">
      <div className="container">
        <nav className="navbar navbar-expand-lg p-0">
          <div className="container-fluid p-0">
            <Link to="/" className="navbar-brand">
              <img src="/images/logo-white.png" alt="logo-white" width="154px" />
            </Link>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/faq" className="nav-link text-light">FAQ</Link>
              </li>
              <li className="nav-item">
                <Link to="/warranty" className="nav-link text-light">Warranty</Link>
              </li>
              <li className="nav-item">
                <Link to="/return" className="nav-link text-light">Return</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light" href="mailto:support@carpento.com">Contact Us</a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="mt-5 text-center fw-light">
          <p>© 2024 Angela Lee. All Rights Reserved.</p>
          <p>For personal learning purposes only, not for commercial use.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
