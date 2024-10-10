// import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-5 pb-2">
      <div className="container">
        <nav className="navbar navbar-expand-lg p-0">
          <div className="container-fluid p-0">
            <a className="navbar-brand" href="#">
              <img src="/images/logo-white.png" alt="logo-white" width="154px" />
            </a>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/faq"><a className="nav-link text-white" href="faq.html">FAQ</a></Link>
              </li>
              <li className="nav-item">
                <Link to="/warranty"><a className="nav-link text-white" href="warranty.html">Warranty</a></Link>
              </li>
              <li className="nav-item">
                <Link to='/return'><a className="nav-link text-white" href="return.html">Return</a></Link>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="mailto:support@carpento.com">Contact Us</a>
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
