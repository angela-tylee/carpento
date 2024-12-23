import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../../components/Pagination';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cartQuantity, setCartQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    'Living Room',
    'Bedroom',
    'Dining',
    'Workspace',
    'Decoration',
    'Others',
  ];

  useEffect(() => {
    getProducts(selectedCategory);
  }, [selectedCategory]);

  const getProducts = async (page = 1) => {
    const res = await axios.get(
      `/v2/api/${
        process.env.REACT_APP_API_PATH
      }/products?category=${encodeURIComponent(selectedCategory.toLowerCase())}&page=${page}`
    );
    console.log(selectedCategory, res);
    setProducts(res.data.products);
    setPagination(res.data.pagination);
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

  return (
    <main className="container mb-6">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
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
            <a
              href="#"
              className={`list-group-item list-group-item-action fw-bold ${
                selectedCategory === '' ? 'active' : ''
              }`}
              aria-current={selectedCategory === '' ? 'true' : 'false'}
              onClick={() => setSelectedCategory('')}
            >
              All
            </a>
            {categories.map((category) => (
              <a
                key={category}
                href="#"
                className={`list-group-item list-group-item-action fw-bold ${
                  selectedCategory === category ? 'active' : ''
                }`}
                aria-current={selectedCategory === category ? 'true' : 'false'}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </a>
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
          <h1 className="fs-2 mb-3">{selectedCategory ? selectedCategory : 'All'}</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            vitae voluptatum consequuntur expedita in minima.
          </p>
          <div>
            <div className="mt-4 mb-2 d-flex justify-content-between align-items-center">
              <p>
                <span>41</span> items
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
                    Select
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Name (A-Z)
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Name (Z-A)
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Price (high-low)
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Price (low-high)
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              {/* TODO: make products multiple of 4 to fill the page (12, 16, 20) */}
              {products.map((product) => (
                <div key={product.id} className="col-3 mt-4">
                  <div className="card w-100 border-0">
                    <Link to={`/product/${product.id}`}>
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
                    </Link>
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
            <Pagination pagination={pagination} changePage={getProducts}/>
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
