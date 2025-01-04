import { useState, useEffect } from 'react';
import { NavLink, Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import PRODUCTS_CATEGORIES from '../constants/categories';

const Header = () => {
  // const [searchParams] = useSearchParams();
  // const category = searchParams.get('category') || '';

  const [cart, setCart] = useState([]);

  const getCart = async () => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/cart`
    );
    console.log(res.data.data);
    setCart(res.data.data);
    console.log(cart, cart.carts);
  };

  useEffect(() => {
      getCart();
    }, []);

  return (
    // TODO: Show dropdown on hover.
    <header className="bg-light sticky-top">
      <div className="container py-3">
        <nav className="navbar navbar-expand-lg p-0 fw-semibold">
          <div className="container-fluid p-0">
            <Link to="/" className="navbar-brand">
              <img src="/images/logo.png" alt="logo" width="154px" />
            </Link>
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
                  <NavLink
                    to="/products"
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Products
                  </NavLink>
                  <ul className="dropdown-menu">
                    {PRODUCTS_CATEGORIES.map((tempCategory) => (
                      <li key={tempCategory}>
                      <Link to={`/products?category=${encodeURIComponent(tempCategory)}`} className="w-100 dropdown-item">
                        {tempCategory}
                      </Link>
                    </li>
                    ))}
                    {/* <li>
                      <NavLink to="/products" className="w-100 dropdown-item">
                        Living Room
                      </NavLink>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Bedroom
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Dining
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Workspace
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Decoration
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Others
                      </a>
                    </li> */}
                  </ul>
                </li>
                <li className="nav-item">
                  <NavLink to="/blogs" className="nav-link">
                    Blog
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/about" className="nav-link">
                    About
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="search-container w-25 border border-1 border-dark rounded-pill overflow-hidden py-1 px-2 me-3">
            {/* TODO: Add search layout: 提示字 Bold highlight keywords, show category as subhead. */}
            <input
              className="border-0 flex-1 focus-ring"
              type="text"
              placeholder="search..."
            />
            <i className="icon-search bi bi-search px-1"></i>
          </div>
          <div className="language-dropdown nav-item dropdown me-2">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-globe2"></i>{' '}
              <span className="fw-normal">EN</span>
            </a>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  EN
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  ZH
                </a>
              </li>
            </ul>
          </div>
          <div className="cart-dropdown nav-item dropdown position-static">
            <Link
              to="/cart"
              className="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="position-relative">
                <i className="bi bi-bag"></i>
                <span className="position-absolute start-100 translate-middle badge rounded-pill bg-danger" style={{ padding: "3px 3px 3px 5px", fontSize: "10px", top: "10%"}}>
                  {cart.carts?.length}
                  <span className="visually-hidden">New alerts</span>
                </span>
              </div>
            </Link>
            <div className="dropdown-menu">
              <h5 className="px-2 my-2">
                Cart (<span>{cart.carts?.length}</span> items)
              </h5>
              <div>
                <hr className="dropdown-divider" />
              </div>
              {cart.carts?.map((cartItem) => (
                <div className="dropdown-item px-2 py-1">
                <div className="row">
                  <div className="col-3">
                    <img
                      src={cartItem.product.imageUrl}
                      alt="mug"
                      width="100px"
                    />
                  </div>
                  <div className="col-6 py-1">
                    {/* FIXME: heading 破版 */}
                    {/* TODO: Make scrollbar if product items exceeds viewport height. */}
                    <h6>{cartItem.product.title}</h6>
                    <p>
                      QTY: <span>{cartItem.qty}</span>
                    </p>
                  </div>
                  <div className="col-3 py-1 text-end d-flex flex-column justify-content-between">
                    <p>
                      <i className="bi bi-x"></i> Remove
                    </p>
                    <p>${cartItem.final_total}</p>
                  </div>
                </div>
              </div>
              ))}
              <div>
                <hr className="dropdown-divider" />
              </div>
              <div className="px-2 py-2">
                <div className="row">
                  <h5 className="col-6">Total</h5>
                  <div className="col-6 text-end fs-5">${cart.total?.toLocaleString()}</div>
                </div>
              </div>
              <div className="px-2 py-1">
                <div className="row">
                  <div className="col-6 pe-1">
                    <Link to="/cart" className="btn btn-outline-dark w-100">
                      Go to Cart
                    </Link>
                  </div>
                  <div className="col-6 ps-1">
                    <Link to="/checkout" className="btn btn-dark w-100">
                      Proceed to Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
