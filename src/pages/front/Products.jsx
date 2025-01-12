import { Link, NavLink, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Pagination from '../../components/Pagination';
import PRODUCTS_CATEGORIES from '../../constants/categories';
import ProductCard2 from '../../components/ProductCard2';
import useSort from '../../hooks/useSort';
import { CartContext } from '../../context/CartContext';

const Products = () => {
  // const { category } = useParams();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '';

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  // const [cartQuantity, setCartQuantity] = useState(1);

  // const [sortCriteria, setSortCriteria] = useState(null);
  // const [sortedProducts, setSortedProducts] = useState(products);
  // TODO: sort all products, not single page
  const { sortedItems, sortCriteria, sortLabel, handleSort } = useSort(allProducts);
  // const [isLoading, setIsLoading] = useState(false);
  const { addToCart, isLoading } = useContext(CartContext);


  useEffect(() => {
    // setProducts([]);
    // setSortCriteria(null);
    // console.log(sortCriteria);
    getProducts();
    getProductsAll(category);
    // handleSort(null); // TODO: 這是對的嗎??

    // const fetchProducts = async () => {
    //   const newProducts = await getProducts();
    //   setProducts(newProducts);
    // };

    // fetchProducts();
  }, [category]);

  const getProducts = async (page = 1) => {
    setProducts([]);

    const page1 = page * 2 - 1; // First page in the pair (1, 3, 5, etc.)
    const page2 = page * 2; // Second page in the pair (2, 4, 6, etc.)

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

    console.log(res1, res2);
    const products =
      res1.data.products.length < 10
        ? res1.data.products
        : [...res1.data.products, ...res2.data.products];

    setProducts(products);
    console.log("products",products);

    setPagination({
      ...res1.data.pagination,
      total_pages: Math.ceil(res1.data.pagination.total_pages / 2),
    });
  };

  const getProductsAll = async (category) => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
    );
    console.log("allProducts", res);
    const categorizedProducts = res.data.products.filter(product => {
      if (category === '') {
        return product
      } 
      return product.category === category
    })
    setAllProducts(categorizedProducts);
  };

  // const addToCart = async (id) => {
  //   const data = {
  //     data: {
  //       product_id: id,
  //       qty: cartQuantity,
  //     },
  //   };
  //   setIsLoading(true);
  //   try {
  //     // console.log(data);
  //     const res = await axios.post(
  //       `/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
  //       data
  //     );
  //     console.log(res);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setIsLoading(false);
  //   }
  // };

  // const handleSort = (criteria, e) => {
  //   // const criteria = e.target.getAttribute("data-criteria");
  //   // TODO: 總感覺這樣有點繞，還是 handleSort(criteria) 比較直觀，但要怎麼取到 e.target.innText 且能讓全域取得？
  //   // FIXME: Cannot get data by category after sorting. 2025-01-08
  //   const sorted = [...products].sort((a, b) => {
  //     switch (criteria) {
  //       case 'name-asc':
  //         return a.title.localeCompare(b.title);
  //       case 'name-desc':
  //         return b.title.localeCompare(a.title);
  //       case 'price-high-low':
  //         return b.price - a.price;
  //       case 'price-low-high':
  //         return a.price - b.price;
  //       case 'newest':
  //         return a.num - b.num;
  //       case 'oldest':
  //         return b.num - a.num;
  //       default:
  //         return 0;
  //     }
  //   });

  //   setSortedProducts(sorted);

  //   const label = e?.target.innerText;
  //   setSortCriteria(label);
  // };

  return (
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
      <div className="row">
        <div className="col-lg-3 d-none d-lg-block">
          <div
            className="list-group pe-3 position-sticky"
            style={{ top: '128px' }}
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
        <div className="col-12 col-lg-9">
          <h1 className="fs-2 mb-3">{category || 'All'}</h1>
          <p>
            {PRODUCTS_CATEGORIES[category] ||
              'Discover a wide range of stylish furniture and home essentials for every space. From modern to classic designs, find everything you need to create a beautiful, functional home.'}
          </p>
          <div>
            <div className="mt-4 d-flex justify-content-between align-items-center">
              <p>
                <span>{products?.length}</span> items
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
                  {/* FIXME: not working ಥ_ಥ  */}
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        className="dropdown-item"
                        type="button"
                        // data-criteria="name-asc"
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
                        // data-criteria="name-desc"
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
                        // data-criteria="price-high-low"
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
                        // data-criteria="price-low-high"
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
                        // data-criteria="price-high-low"
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
                        // data-criteria="price-low-high"
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
                  <ProductCard2 product={product} hasFooter={true} addToCart={addToCart} isLoading={isLoading}/>
                  {/* <div className="card w-100 border-0 d-flex flex-column h-100 justify-content-between">
                    <NavLink
                      to={`/product/${product.id}`}
                      className="card-header px-0 border-0"
                      style={{
                        backgroundImage: `url(${product.imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '240px',
                      }}
                    >
                      <span
                        className={`badge ${
                          product.tag === 'sale' || product.tag === 'hot'
                            ? 'bg-danger'
                            : product.tag === 'new'
                            ? 'bg-warning'
                            : ''
                        }`}
            ｀          >
                        {product.tag}
                      </span>
                    </NavLink>
                    <NavLink
                      to={`/product/${product.id}`}
                      className="card-body p-0 mt-2 flex-grow"
                    >
                      <div className="d-flex flex-column h-100 justify-content-between">
                        <h5 className="card-title fs-6 fw-bold">
                          {product.title}
                        </h5>
                        <div className="card-text">
                          <span className="text-primary me-1">
                            ${product.price.toLocaleString()}
                          </span>
                          <del>${product.origin_price.toLocaleString()}</del>
                        </div>
                      </div>
                    </NavLink>
                    <div className="card-footer d-flex w-100 mt-2 bg-transparent border-0 p-0">
                      <button
                        type="button"
                        className="btn btn-primary w-100"
                        onClick={() => addToCart(product.id)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div> */}
                </div>
              ))}
            </div>
            {/* FIXME: `current_page` is not suitable for this page. */}
            {!sortCriteria && <Pagination pagination={pagination} changePage={getProducts} />}
            {/* <Pagination pagination={pagination} changePage={getProducts} /> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Products;
