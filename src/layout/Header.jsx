import { useState, useEffect, useContext, useRef } from 'react';
import { NavLink, Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import PRODUCTS_CATEGORIES from '../constants/categories';
import { CartContext } from '../context/CartContext';
import { StickyHeaderContext } from '../context/StickyHeaderContext';
import Message from '../components/Message';
import { MessageContext } from '../context/MessageContext';

const Header = () => {
  const [products, setProducts] = useState([]);
  const [isLoadingDeleteItem, setIsLoadingDeleteItem] = useState(null);
  const { cart, getCart, cartDropdownRef } = useContext(CartContext);

  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  const { showMessage, messageType, message } = useContext(MessageContext);

  const getProductsAll = async () => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
    );

    console.log('products', res);

    setProducts(res.data.products);
  };

  const { headerRef, unstickyDistance } = useContext(StickyHeaderContext);

  // const headerRef = useRef(null); // Create a ref for the header element
  // const unstickyDistance = 900; // Distance in pixels

  useEffect(() => {
    setSearchTerm('');
    // getCart();
    getProductsAll();

    const handleScroll = () => {
      if (window.scrollY > unstickyDistance) {
        headerRef.current?.classList.add('unsticky');
      } else {
        headerRef.current?.classList.remove('unsticky');
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const deleteCartItem = async (id) => {
    setIsLoadingDeleteItem(id);
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`
      );
      console.log(res);
      // alert(res.data.message);
      setIsLoadingDeleteItem(null);
      showMessage('success', res.data.message);
      getCart();
    } catch (error) {
      console.log(error);
      setIsLoadingDeleteItem(null);
      showMessage('danger', error.response.data.message);
    }
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Filter suggestions based on search term
  const filteredSuggestions = products.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Highlight matching text
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

  return (
    <>
      <Message type={messageType} message={message} />
      <header ref={headerRef} className="bg-light sticky">
        <div className="container py-1 py-sm-2 py-lg-3">
          <nav className="navbar navbar-expand-md p-0 fw-semibold">
            <div className="container-fluid p-0">
              {/* Logo */}
              <Link to="/" className="navbar-brand col-4 col-sm-3 col-lg-2">
                <img
                  src="/images/logo.png"
                  alt="logo"
                  // width="154px"
                  className="w-100"
                />
              </Link>

              {/* Mobile menu */}
              <div className="d-flex align-items-center">
                <Link
                  to="/cart"
                  className="me-2 d-block d-md-none"
                  role="button"
                >
                  <div className="position-relative mt-1">
                    <i className="bi bi-bag fs-4"></i>
                    <span
                      className="position-absolute start-100 translate-middle badge rounded-pill bg-danger"
                      style={{
                        padding: '3px 3px 3px 5px',
                        fontSize: '10px',
                        top: '10%',
                      }}
                    >
                      {cart.carts?.reduce(
                        (total, cartItem) => total + cartItem.qty,
                        0
                      )}
                      <span className="visually-hidden">New alerts</span>
                    </span>
                  </div>
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
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item text-center text-md-start py-1 py-md-0 dropdown">
                    <NavLink
                      to="/products"
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {/* FIXME: no active style: active class is added, but no ::after element added like othersP */}
                      Products
                    </NavLink>
                    <ul className="product-dropdown-menu dropdown-menu">
                      <li className="text-center text-md-start">
                        <Link to="/products" className="w-100 dropdown-item">
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
                            {tempCategory}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="nav-item text-center text-md-start py-1 py-md-0">
                    <NavLink to="/blogs" className="nav-link">
                      Blog
                    </NavLink>
                  </li>
                  <li className="nav-item text-center text-md-start py-1 py-md-0">
                    <NavLink to="/about" className="nav-link">
                      About
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>

            {/* Search */}
            <div className="position-relative col-12 col-md-4 col-lg-3 me-3">
              <div className="search-container d-flex align-items-center border border-dark rounded-pill overflow-hidden py-1 px-3">
                <input
                  className="form-control p-0 border-0 shadow-none flex-grow-1 me-2"
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
                            {/* QUESTION: explain this */}
                            <div>{highlightMatch(item.title, searchTerm)}</div>
                            {/* <small className="text-muted">{item.category}</small> */}{' '}
                            {/* text-muted will be deprecated */}
                            <small className="text-body-secondary">
                              {item.category}
                            </small>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-3 text-muted">No suggestions found</div>
                  )}
                </div>
              )}
            </div>

            {/* Language Switcher */}
            {/* <div className="language-dropdown nav-item dropdown me-2">
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
          </div> */}

            {/* Cart */}
            <div className="cart-dropdown nav-item dropdown position-static d-none d-md-block">
              <Link
                to="/cart"
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="position-relative">
                  <i className="bi bi-bag fs-5"></i>
                  <span
                    className="position-absolute start-100 translate-middle badge rounded-pill bg-danger"
                    style={{
                      padding: '3px 3px 3px 5px',
                      fontSize: '10px',
                      top: '10%',
                    }}
                  >
                    {cart.carts?.reduce(
                      (total, cartItem) => total + cartItem.qty,
                      0
                    )}
                  </span>
                </div>
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
                      // <Link
                      //   className="dropdown-item px-2 py-1"
                      //   to={`/product/${cartItem.product.id}`}
                      // >
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
                      // </Link>
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
