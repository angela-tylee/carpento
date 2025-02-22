import { useState, useEffect, useContext } from 'react';
import { NavLink, Link, useLocation } from 'react-router';
import axios from 'axios';
import PRODUCTS_CATEGORIES from '../constants/categories';
import { CartContext } from '../context/CartContext';
import { StickyHeaderContext } from '../context/StickyHeaderContext';
import Message from '../components/Message';
import { MessageContext } from '../context/MessageContext';
import CartBadge from '../components/CartBadge';
import Countdown from '../components/Countdown';

const Header = () => {
  const [products, setProducts] = useState([]);
  const [isLoadingDeleteItem, setIsLoadingDeleteItem] = useState(null);
  const { cart, getCart, cartDropdownRef } = useContext(CartContext);
  const { showMessage, messageType, message } = useContext(MessageContext);
  const [theme, setTheme] = useState('light');

  const location = useLocation();
  const isActive = location.pathname.startsWith("/products") || location.pathname.startsWith("/product/");

  const getProductsAll = async () => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
    );

    setProducts(res.data.products);
  };

  const { headerRef, unstickyDistance } = useContext(StickyHeaderContext);

  useEffect(() => {
    setSearchTerm('');
    getProductsAll();

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-bs-theme', savedTheme);
      return;
    }

    const initialTheme =
      document.documentElement.getAttribute('data-bs-theme') || 'light';
    setTheme(initialTheme);
    localStorage.setItem('theme', initialTheme);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > unstickyDistance) {
        headerRef.current?.classList.add('unsticky');
      } else {
        headerRef.current?.classList.remove('unsticky');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [unstickyDistance, headerRef]);

  const deleteCartItem = async (id) => {
    setIsLoadingDeleteItem(id);
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`
      );
      setIsLoadingDeleteItem(null);
      showMessage('success', res.data.message);
      getCart();
    } catch (error) {
      setIsLoadingDeleteItem(null);
      showMessage('danger', error.response.data.message);
    }
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = products.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const highlightMatch = (text, query) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <strong key={index}>{part}</strong>
      ) : (
        part
      )
    );
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  };


  return (
    <>
      <Message type={messageType} message={message} />
      <header ref={headerRef} className="bg-light sticky">
        <Countdown />
        <div className="container py-1 py-sm-2 py-lg-3">
          <nav className="navbar navbar-expand-md p-0 fw-semibold">
            <div className="container-fluid p-0">
              {/* Logo */}
              <Link to="/" className="navbar-brand col-4 col-sm-3 col-lg-2">
                <img
                  src={`${process.env.PUBLIC_URL}/images/logo${
                    theme === 'light' ? '' : '-white'
                  }.png`}
                  alt="logo"
                  className="w-100"
                />
              </Link>

              {/* Mobile menu */}
              <div className="d-flex align-items-center">
                <Link
                  to="/cart"
                  className="me-2 d-block d-md-none mt-1"
                  role="button"
                >
                  <CartBadge size={'fs-4'} />
                </Link>
                <button
                  className="navbar-toggler ms-2"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
              </div>

              {/* Nav Items */}
              <div
                className="collapse navbar-collapse"
                id="navbarNav"
              >
                <ul className="navbar-nav mb-2">
                  <li className="nav-item text-center text-md-start py-2 py-md-0 dropdown">
                    <NavLink
                      to="/products"
                      className={isActive ? "active nav-link d-inline d-md-block" : "nav-link d-inline d-md-block"}
                    >
                      <span
                        className="dropdown-toggle"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Products
                      </span>
                    </NavLink>
                    <ul className="product-dropdown-menu dropdown-menu mt-1 mt-md-0">
                      <li className="text-center text-md-start">
                        <Link
                          to="/products"
                          className="w-100 dropdown-item"
                        >
                          All
                        </Link>
                      </li>
                      {Object.keys(PRODUCTS_CATEGORIES).map((tempCategory) => (
                        <li
                          className="text-center text-md-start"
                          key={tempCategory}
                        >
                          <Link
                            to={`/products?category=${encodeURIComponent(
                              tempCategory
                            )}`}
                            className="w-100 dropdown-item"
                          >
                            <span className="d-none d-md-block">
                              {tempCategory}
                            </span>
                            <span
                              className="d-md-none"
                              data-bs-toggle="collapse"
                              data-bs-target="#navbarNav"
                            >
                              {tempCategory}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="nav-item text-center text-md-start py-2 py-md-0">
                    <NavLink
                      to="/blogs"
                      className="nav-link d-inline d-md-block"
                    >
                      <span className="d-none d-md-block">Blog</span>
                      <span
                        className="d-md-none"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                      >
                        Blog
                      </span>
                    </NavLink>
                  </li>
                  <li className="nav-item text-center text-md-start py-2 py-md-0">
                    <NavLink
                      to="/about"
                      className="nav-link d-inline d-md-block"
                    >
                      <span className="d-none d-md-block">About</span>
                      <span
                        className="d-md-none"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                      >
                        About
                      </span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>

            {/* Search */}
            <div className="position-relative col-12 col-md-4 col-lg-3 me-2 flex-grow-1">
              <div className="search-container d-flex align-items-center border border-dark rounded-pill overflow-hidden py-1 px-3">
                <input
                  className="form-control p-0 border-0 shadow-none flex-grow-1 me-2 bg-transparent"
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 200)
                  }
                />
                <i className="icon-search bi bi-search px-1 flex-shrink-0"></i>
              </div>
              {showSuggestions && searchTerm && (
                <div
                  className="position-absolute start-0 w-100 mt-1 bg-white border shadow-sm"
                  style={{
                    maxHeight: '300px',
                    overflowY: 'auto',
                    zIndex: 1000,
                  }}
                >
                  {filteredSuggestions.length > 0 ? (
                    <ul className="list-group list-group-flush">
                      {filteredSuggestions.map((item, index) => (
                        <li
                          key={index}
                          className="list-group-item list-group-item-action"
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            setSearchTerm(item.title);
                            setShowSuggestions(false);
                          }}
                        >
                          <Link
                            to={`/product/${item.id}`}
                            className="d-flex flex-column"
                          >
                            <div>{highlightMatch(item.title, searchTerm)}</div>
                            <small className="text-body-secondary">
                              {item.category}
                            </small>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item list-group-item-action">
                        <p className="p-2 text-body-secondary">
                          No suggestions found
                        </p>
                      </li>
                    </ul>
                  )}
                </div>
              )}
            </div>
            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="btn btn-none border-0 p-0 me-2 d-none d-md-block"
              title="switch theme"
            >
              {theme === 'light' ? (
                <i className="bi bi-sun-fill fs-5"></i>
              ) : (
                <i className="bi bi-moon-fill fs-5"></i>
              )}
            </button>

            {/* Cart */}
            <div className="cart-dropdown nav-item dropdown position-static d-none d-md-block">
              <Link
                to="/cart"
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <CartBadge size={'fs-5'} />
              </Link>
              <div ref={cartDropdownRef} className="dropdown-menu shadow-sm">
                <h5 className="px-2 my-2">
                  Cart (
                  <span>
                    {cart.carts?.reduce(
                      (total, cartItem) => total + cartItem.qty,
                      0
                    )}
                  </span>{' '}
                  items)
                </h5>
                <div>
                  <hr className="dropdown-divider" />
                </div>
                <div
                  className="cart-items-container overflow-auto"
                  style={{ maxHeight: '60vh' }}
                >
                  {cart.carts?.length === 0 ? (
                    <div className="px-2 py-1 fw-normal">
                      <p className="text-center">Your cart is empty.</p>
                      <p className="text-center">
                        <Link
                          to="/products"
                          className="text-decoration-underline link-opacity-100"
                        >
                          add something to cart
                        </Link>
                      </p>
                    </div>
                  ) : (
                    cart.carts?.map((cartItem) => (
                      <div
                        className="dropdown-item px-2 py-1"
                        key={cartItem.product.id}
                      >
                        <div className="row">
                          <div className="col-3">
                            <Link to={`/product/${cartItem.product.id}`}>
                              <img
                                src={cartItem.product.imagesUrl[0]}
                                alt={cartItem.product.title}
                                className="text-wrap"
                                width="100px"
                              />
                            </Link>
                          </div>
                          <div className="col-6 py-1">
                            <Link to={`/product/${cartItem.product.id}`}>
                              <h6 className="text-wrap">
                                {cartItem.product.title}
                              </h6>
                            </Link>
                            <p>
                              QTY: <span>{cartItem.qty}</span>
                            </p>
                          </div>
                          <div className="col-3 py-1 text-end d-flex flex-column justify-content-between">
                            <button
                              className="btn btn-none border-0 pt-0"
                              onClick={() => {
                                deleteCartItem(cartItem.id);
                              }}
                              disabled={isLoadingDeleteItem === cartItem.id}
                            >
                              {isLoadingDeleteItem === cartItem.id ? (
                                <div
                                  className={`spinner-border spinner-border-sm text-secondary me-1
                                  `}
                                  role="status"
                                >
                                  <span className="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              ) : (
                                <i className="bi bi-x me-1"></i>
                              )}
                              Remove
                            </button>
                            <p>${cartItem.final_total}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div>
                  <hr className="dropdown-divider" />
                </div>
                <div className="px-2 py-2">
                  <div className="row">
                    <h5 className="col-6">Total</h5>
                    <div className="col-6 text-end fs-5">
                      ${cart.total?.toLocaleString()}
                    </div>
                  </div>
                </div>
                {cart.carts?.length === 0 ? (
                  ''
                ) : (
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
                )}
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
