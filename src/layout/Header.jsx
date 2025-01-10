import { useState, useEffect } from 'react';
import { NavLink, Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import PRODUCTS_CATEGORIES from '../constants/categories';

const Header = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({
    carts: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async () => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
    );

    console.log('products', res);

    setProducts(res.data.products);
  };

  const getCart = async () => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/cart`
    );
    console.log('cart', res.data.data);
    setCart(res.data.data);
  };

  useEffect(() => {
    setSearchTerm('');
    getCart();
    getProducts();
  }, []);

  const deleteCartItem = async (id) => {
    setIsLoading(true);
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`
      );
      console.log(res);
      alert(res.data.message);
      setIsLoading(false);
      getCart();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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
    <header className="bg-light sticky-top">
      <div className="container py-1 py-sm-2 py-lg-3">
        <nav className="navbar navbar-expand-md p-0 fw-semibold">
          <div className="container-fluid p-0">

            {/* Logo */}
            <Link to="/" className="navbar-brand col-4 col-sm-3 col-lg-2">
              <img
                src="/images/logo.png"
                alt="logo"
                width="154px"
                className="w-100"
              />
            </Link>

            {/* Mobile menu */}
            <div className="d-flex align-items-center">
              {/* TODO: cart 元件化 */}
              <Link
                to="/cart"
                className="nav-link me-2 d-block d-md-none"
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
                    {cart.carts?.length}
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
                    {/* FIXME: no active style */}
                    Products
                  </NavLink>
                  {/* TODO: make border and shadow responsive */}
                  <ul className="dropdown-menu border-0 border-md border-1 border-gray shadow-md-sm">
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
              {/* TODO: 輸入產品文字太長時，會破版 */}
              <input
                className="form-control p-0 border-0 shadow-none"
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
              <i className="icon-search bi bi-search px-1"></i>
            </div>

            {showSuggestions && searchTerm && (
              <div
                className="position-absolute start-0 w-100 mt-1 bg-white border shadow-sm"
                style={{ maxHeight: '300px', overflowY: 'auto', zIndex: 1000 }}
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
                          {/* TODO: explain this */}
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
          {/* TODO: cart-dropdown 元件化 */}
          <div className="cart-dropdown nav-item dropdown position-static d-none d-md-block">
            <Link
              to="/cart"
              className="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="position-relative">
                <i className="bi bi-bag"></i>
                <span
                  className="position-absolute start-100 translate-middle badge rounded-pill bg-danger"
                  style={{
                    padding: '3px 3px 3px 5px',
                    fontSize: '10px',
                    top: '10%',
                  }}
                >
                  {cart.carts?.length}
                  <span className="visually-hidden">New alerts</span>
                </span>
              </div>
            </Link>
            <div className="dropdown-menu shadow-sm">
              <h5 className="px-2 my-2">
                Cart (<span>{cart.carts?.length}</span> items)
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
                    <Link
                      className="dropdown-item px-2 py-1"
                      to={`/product/${cartItem.product.id}`}
                    >
                      <div className="row">
                        <div className="col-3">
                          <img
                            src={cartItem.product.imageUrl}
                            alt="mug"
                            width="100px"
                          />
                        </div>
                        <div className="col-6 py-1">
                          <h6 className="text-wrap">
                            {cartItem.product.title}
                          </h6>
                          <p>
                            QTY: <span>{cartItem.qty}</span>
                          </p>
                        </div>
                        <div className="col-3 py-1 text-end d-flex flex-column justify-content-between">
                          {/* TODO: Remove item */}
                          <p>
                            <i
                              className="bi bi-x"
                              onClick={() => {
                                deleteCartItem(cartItem.id);
                              }}
                              style={{ cursor: 'pointer' }}
                            ></i>{' '}
                            Remove
                          </p>
                          <p>${cartItem.final_total}</p>
                        </div>
                      </div>
                    </Link>
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
  );
};

export default Header;
