// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';

const Header = () => {
  return (
    <header className="container py-3">
      <nav className="navbar navbar-expand-lg p-0 fw-semibold">
        <div className="container-fluid p-0">
          <a className="navbar-brand" href="index.html">
            <img src="../assets/images/logo.png" alt="logo" width="154px" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="./products.html"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Products
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="./products.html">Living Room</a></li>
                  <li><a className="dropdown-item" href="#">Bedroom</a></li>
                  <li><a className="dropdown-item" href="#">Dining</a></li>
                  <li><a className="dropdown-item" href="#">Workspace</a></li>
                  <li><a className="dropdown-item" href="#">Decoration</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Others</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="blogs.html">Blog</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="about.html">About</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="search-container w-25 border border-1 border-dark rounded-pill overflow-hidden py-1 px-2 me-3">
          <input className="border-0 flex-1" type="text" placeholder="search..." />
          <i className="icon-search bi bi-search px-1"></i>
        </div>

        <div className="language-dropdown nav-item dropdown me-2">
          <a
            className="nav-link dropdown-toggle"
            href="cart.html"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-globe2"></i> <span className="fw-normal">EN</span>
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">EN</a></li>
            <li><a className="dropdown-item" href="#">ZH</a></li>
          </ul>
        </div>

        <div className="cart-dropdown nav-item dropdown position-static">
          <a
            className="nav-link dropdown-toggle"
            href="cart.html"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-bag"></i>
          </a>
          <div className="dropdown-menu">
            <h5 className="px-2 my-2">Cart (<span>3</span> items)</h5>
            <div><hr className="dropdown-divider" /></div>

            <div className="dropdown-item px-2 py-1">
              <div className="row">
                <div className="col-3">
                  <img src="../assets/images/products/dining/mug-1.jpeg" alt="mug" width="100px" />
                </div>
                <div className="col-6 py-1">
                  <h6>Card Title</h6>
                  <p>QTY: <span>1</span></p>
                </div>
                <div className="col-3 py-1 text-end d-flex flex-column justify-content-between">
                  <p><i className="bi bi-x"></i> Remove</p>
                  <p>$1,500</p>
                </div>
              </div>
            </div>

            <div className="dropdown-item px-2 py-1">
              <div className="row">
                <div className="col-3">
                  <img src="../assets/images/products/living-room/cushion-3.jpeg" alt="cushion" width="100px" />
                </div>
                <div className="col-6 py-1">
                  <h6>Card Title</h6>
                  <p>QTY: <span>1</span></p>
                </div>
                <div className="col-3 py-1 text-end d-flex flex-column justify-content-between">
                  <p><i className="bi bi-x"></i> Remove</p>
                  <p>$1,500</p>
                </div>
              </div>
            </div>

            <div className="dropdown-item px-2 py-1">
              <div className="row">
                <div className="col-3">
                  <img src="../assets/images/products/workspace/desk-lamp-3.jpeg" alt="desk lamp" width="100px" />
                </div>
                <div className="col-6 py-1">
                  <h6>Card Title</h6>
                  <p>QTY: <span>1</span></p>
                </div>
                <div className="col-3 py-1 text-end d-flex flex-column justify-content-between">
                  <p><i className="bi bi-x"></i> Remove</p>
                  <p>$1,500</p>
                </div>
              </div>
            </div>

            <div><hr className="dropdown-divider" /></div>

            <h5 className="px-2 my-2">Total</h5>
            <div className="px-2 py-1">
              <div className="row">
                <div className="col-6 pe-1">
                  <a href="./cart.html" className="btn btn-outline-dark w-100">Go to Cart</a>
                </div>
                <div className="col-6 ps-1">
                  <a href="./checkout.html" className="btn btn-dark w-100">Proceed to Checkout</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
