import { useEffect, useState, useContext, useRef } from 'react';
import { Link, NavLink, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Pagination from '../../components/Pagination';
import PRODUCTS_CATEGORIES from '../../constants/categories';
import ProductCard2 from '../../components/ProductCard2';
import useSort from '../../hooks/useSort';
import { CartContext } from '../../context/CartContext';
import { StickyHeaderContext } from '../../context/StickyHeaderContext';
import Message from '../../components/Message';
import { MessageContext } from '../../context/MessageContext';
import FullPageLoader from '../../components/FullPageLoader';

const Products = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '';

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  const { sortedItems, sortCriteria, sortLabel, handleSort } = useSort(allProducts);
  const { addToCart, isLoading } = useContext(CartContext);

  const { unstickyDistance, headerHeight } = useContext(StickyHeaderContext);

  const { messageType, message } = useContext(MessageContext);

  const sidebarRef = useRef(null);

  useEffect(() => {
    getProducts();
    getProductsAll(category);

    const handleScroll = () => {
      if (window.scrollY > unstickyDistance) {
        sidebarRef.current.style.top = '8px';
        sidebarRef.current.style.transition = 'top 0.5s ease-in-out';
      } else {
        sidebarRef.current.style.top = `${headerHeight}px`;
        sidebarRef.current.style.transition = 'top 0.5s ease-in-out';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [category, headerHeight, unstickyDistance]);

  const getProducts = async (page = 1) => {
    setProducts([]);
    setIsLoadingProducts(true);

    const page1 = page * 2 - 1; 
    const page2 = page * 2; 

    try {
      const [res1, res2] = await Promise.all([
        axios.get(
          `/v2/api/${
            process.env.REACT_APP_API_PATH
          }/products?category=${encodeURIComponent(category)}&page=${page1}`
        ),
        axios.get(
          `/v2/api/${
            process.env.REACT_APP_API_PATH
          }/products?category=${encodeURIComponent(category)}&page=${page2}`
        ),
      ]);

      const products =
        res1.data.products.length < 10
          ? res1.data.products
          : [...res1.data.products, ...res2.data.products];

      setProducts(products);

      setPagination({
        ...res1.data.pagination,
        current_page: Math.ceil(res1.data.pagination.current_page / 2),
        has_next: Math.ceil(res1.data.pagination.current_page / 2) < Math.ceil(res1.data.pagination.total_pages / 2),
        has_pre: Math.ceil(res1.data.pagination.current_page / 2) > 1,
        total_pages: Math.ceil(res1.data.pagination.total_pages / 2),
      });

      setIsLoadingProducts(false);
    } catch (error) {
      setIsLoadingProducts(false);
    }
  };

  const getProductsAll = async (category) => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
    );
    const categorizedProducts = res.data.products.filter((product) => {
      if (category === '') {
        return product;
      }
      return product.category === category;
    });
    setAllProducts(categorizedProducts);
  };

  return (
    <>
      <Message type={messageType} message={message} />
      <main className="container mb-6">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Products
            </li>
          </ol>
        </nav>
        <div className="row h-100">
          <div className="col-lg-3 d-none d-lg-block">
            <div
              ref={sidebarRef}
              className="list-group pe-3 position-sticky sticky-top z-0"
            >
              <Link
                to={`/products`}
                className={`list-group-item list-group-item-action fw-bold ${
                  category === '' ? 'active' : ''
                }`}
              >
                All
              </Link>
              {Object.keys(PRODUCTS_CATEGORIES).map((tempCategory) => (
                <Link
                  to={`/products?category=${encodeURIComponent(tempCategory)}`}
                  key={tempCategory}
                  className={`list-group-item list-group-item-action fw-bold ${
                    category === tempCategory ? 'active' : ''
                  }`}
                >
                  {tempCategory}
                </Link>
              ))}
            </div>
          </div>
          {isLoadingProducts ? (
            <div className="col-12 col-lg-9 h-100 pb-4">
              <FullPageLoader/>
            </div>
          ) : (
            <div className="col-12 col-lg-9">
              <h1 className="fs-2 mb-3">{category || 'All'}</h1>
              <p>
                {PRODUCTS_CATEGORIES[category] ||
                  'Discover a wide range of stylish furniture and home essentials for every space. From modern to classic designs, find everything you need to create a beautiful, functional home.'}
              </p>
              <div>
                <div className="mt-4 d-flex justify-content-between align-items-center">
                  <p>
                    <span>{allProducts.length}</span> items
                  </p>
                  <div className="d-flex align-items-center">
                    <p className="me-1">Sort by:</p>
                    <div className="dropdown">
                      <button
                        className="btn btn-outline-dark dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {sortLabel || 'Select'}
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={(e) => {
                              handleSort('name-asc', e);
                            }}
                          >
                            Name (A-Z)
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={(e) => {
                              handleSort('name-desc', e);
                            }}
                          >
                            Name (Z-A)
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={(e) => {
                              handleSort('price-high-low', e);
                            }}
                          >
                            Price (high-low)
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={(e) => {
                              handleSort('price-low-high', e);
                            }}
                          >
                            Price (low-high)
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={(e) => {
                              handleSort('newest', e);
                            }}
                          >
                            Newest Arrivals
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            type="button"
                            onClick={(e) => {
                              handleSort('oldest', e);
                            }}
                          >
                            Oldest Arrivals
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {(sortCriteria ? sortedItems : products)?.map((product) => (
                    <div key={product.id} className="col-6 col-sm-3 mt-4">
                      <ProductCard2
                        product={product}
                        hasFooter={true}
                        addToCart={addToCart}
                        isLoading={isLoading}
                      />
                    </div>
                  ))}
                </div>
                {!sortCriteria && (
                  <Pagination
                    pagination={pagination}
                    changePage={getProducts}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Products;
