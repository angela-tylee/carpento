import { Link, NavLink, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../../components/Pagination';
import PRODUCTS_CATEGORIES from '../../constants/categories';

const Products = () => {
  // const { category } = useParams();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '';

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cartQuantity, setCartQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortedProducts, setSortedProducts] = useState([...products]);

  // const categories = [
  //   'Living Room',
  //   'Bedroom',
  //   'Dining',
  //   'Workspace',
  //   'Decoration',
  //   'Others',
  // ];

  useEffect(() => {
    setProducts([]);
    // setSortCriteria(null);
    console.log(sortCriteria);
    getProducts();
    handleSort(null); // TODO: 這是對的嗎??
  }, [category, sortCriteria]);

  // const getProducts = async (page = 1) => {
  //   const res = await axios.get(
  //     `/v2/api/${
  //       process.env.REACT_APP_API_PATH
  //     }/products?category=${encodeURIComponent(
  //       category.toLowerCase()
  //     )}&page=${page}`
  //   );

  //   console.log(res);
  //   setProducts(res.data.products);
  //   setPagination(res.data.pagination);
  // };

  const getProducts = async (page = 1) => {
    setProducts([]);

    const page1 = page * 2 - 1; // First page in the pair (1, 3, 5, etc.)
    const page2 = page * 2; // Second page in the pair (2, 4, 6, etc.)

    const [res1, res2] = await Promise.all([
      axios.get(
        `/v2/api/${
          process.env.REACT_APP_API_PATH
        }/products?category=${encodeURIComponent(
          category.toLowerCase()
        )}&page=${page1}`
      ),
      axios.get(
        `/v2/api/${
          process.env.REACT_APP_API_PATH
        }/products?category=${encodeURIComponent(
          category.toLowerCase()
        )}&page=${page2}`
      ),
    ]);

    console.log(res1, res2);
    const products =
      res1.data.products.length < 10
        ? res1.data.products
        : [...res1.data.products, ...res2.data.products];

    setProducts(products);
    console.log(products);

    setPagination({
      ...res1.data.pagination,
      total_pages: Math.ceil(res1.data.pagination.total_pages / 2),
    });
  };

  const addToCart = async (id) => {
    const data = {
      data: {
        product_id: id,
        qty: cartQuantity,
      },
    };
    setIsLoading(true);
    try {
      // console.log(data);
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
        data
      );
      console.log(res);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleSort = (criteria, e) => {
    console.log(e);
    // const criteria = e.target.getAttribute("data-criteria");
    // TODO: 總感覺這樣有點繞，還是 handleSort(criteria) 比較直觀，但要怎麼取到 e.target.innText 且能讓全域取得？
    const label = e?.target.innerText;
    setSortCriteria(label);

    const sorted = [...products].sort((a, b) => {
      switch (criteria) {
        case 'newest':
          return a.num - b.num;
        case 'oldest':
          return b.num - a.num;
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'price-high-low':
          return b.price - a.price;
        case 'price-low-high':
          return a.price - b.price;
        default:
          return 0;
      }
    });

    setSortedProducts(sorted);
    console.log(sortedProducts);
  };

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
        <div className="col-3">
          <div
            className="list-group pe-3 position-sticky"
            style={{ top: '128px' }}
          >
            {/* <a
              href="/"
              className={`list-group-item list-group-item-action fw-bold ${
                selectedCategory === '' ? 'active' : ''
              }`}
              aria-current={selectedCategory === '' ? 'true' : 'false'}
              onClick={(e) => {e.preventDefault();setSelectedCategory('')}}
            >
              All
            </a> */}
            <Link
              to={`/products`}
              className={`list-group-item list-group-item-action fw-bold ${
                category === '' ? 'active' : ''
              }`}
            >
              All
            </Link>
            {/* {PRODUCTS_CATEGORIES.map((category) => (
              <a
                key={category}
                href="/"
                className={`list-group-item list-group-item-action fw-bold ${
                  selectedCategory === category ? 'active' : ''
                }`}
                aria-current={selectedCategory === category ? 'true' : 'false'}
                onClick={(e) => {e.preventDefault(); setSelectedCategory(category)}}
              >
                {category}
              </a>
            ))} */}
            {PRODUCTS_CATEGORIES.map((tempCategory) => (
              <Link
                // to={`/products/${tempCategory.toLowerCase()}`}
                to={`/products?category=${encodeURIComponent(tempCategory)}`}
                key={tempCategory}
                className={`list-group-item list-group-item-action fw-bold ${
                  category === tempCategory ? 'active' : ''
                }`}
              >
                {tempCategory}
              </Link>
            ))}
            {/* <a href="#" className="list-group-item list-group-item-action active" aria-current="true">All</a>
            <a href="#" className="list-group-item list-group-item-action">Living Room</a>
            <a href="#" className="list-group-item list-group-item-action">Bedroom</a>
            <a href="#" className="list-group-item list-group-item-action">Dining</a>
            <a href="#" className="list-group-item list-group-item-action">Workspace</a>
            <a href="#" className="list-group-item list-group-item-action">Decoration</a>
            <a className="list-group-item list-group-item-action disabled" aria-disabled="true">Others</a> */}
          </div>
        </div>
        <div className="col-9">
          <h1 className="fs-2 mb-3">{category || 'All'}</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            vitae voluptatum consequuntur expedita in minima.
          </p>
          <div>
            <div className="mt-4 mb-2 d-flex justify-content-between align-items-center">
              <p>
                <span>{products.length}</span> items
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
                    {sortCriteria || 'Select'}
                  </button>
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
              {/* TODO: product card 元件化 */}
              {(sortCriteria ? sortedProducts : products).map((product) => (
                <div key={product.id} className="col-3 mt-4">
                  <div className="card w-100 border-0">
                    <NavLink to={`/product/${product.id}`}>
                      <img
                        src={product.imageUrl}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body p-0 mt-2">
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
                    <div className="card-footer d-flex w-100 mt-2">
                      <input
                        type="text"
                        className="form-control w-25 text-center"
                        value="1"
                        readOnly
                      />
                      <button
                        type="button"
                        className="btn btn-primary ms-1 w-75"
                        onClick={() => addToCart(product.id)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {/* QUESTION: Array.from? */}
              {/* {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="col-3">
                  <div className="card w-100 border-0">
                    <img src="../assets/images/products/living-room/cabinet-3.jpeg" className="card-img-top" alt="..." />
                    <div className="card-body p-0 mt-2">
                      <h5 className="card-title fs-6 fw-bold">Card title</h5>
                      <div className="card-text">
                        <span className="text-primary">$1,500</span>
                        <del>$2,000</del>
                      </div>
                      <div className="d-flex w-100 mt-2">
                        <input type="number" className="form-control w-25 text-center" />
                        <button type="button" className="btn btn-primary ms-1 w-75">Add to Cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))} */}
            </div>
            {/* TODO: `current_page` is not suitable for this page. */}
            <Pagination pagination={pagination} changePage={getProducts} />
            {/* <nav aria-label="..." className="mt-4">
              <ul className="pagination fw-bold justify-content-end">
                <li className={`page-item disabled=${!pagination.has_pre}`}>
                  <a className="page-link" href="/" onClick={(e) => {e.preventDefault(); getProducts(pagination.current_page - 1);}}>&lt;</a>
                </li>
                {[...Array(pagination.total_pages)].map((_, index) => (
                    <li key={index}
                    className={`page-item ${pagination.current_page === index + 1 ? 'active' : ''}`} 
                    aria-current={pagination.current_page === index + 1 ? 'page': undefined}>
                    <a className="page-link" href="/"
                    onClick={(e) => {e.preventDefault(); getProducts(index + 1);}}>
                      {index + 1}
                    </a>
                  </li>
                  ))}
                <li className={`page-item disabled=${!pagination.has_next}`}>
                  <a className="page-link" href="/" onClick={(e) => {e.preventDefault(); getProducts(pagination.current_page + 1);}}>&gt;</a>
                </li>
              </ul>
            </nav> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Products;
