import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async (page = 1) => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
    );

    console.log('products', res);
    setProducts(res.data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="home">
      <main>
        <section
          className="section-hero py-3 py-md-5 py-lg-7"
          style={{ backgroundImage: 'url(/images/banner-6.jpeg)' }}
        >
          <div className="container section-body section-hero-body">
            <div className="text-light mt-7">
              <h1 className="display-4">Welcome to Carpento</h1>
              <p className="fs-2">Special Sales is coming soon!</p>
              <Link to="/products" className="btn btn-outline-light mt-4">
                Shop Now
              </Link>
            </div>
          </div>
        </section>

        <section className="section-sale container py-3 py-md-5 py-lg-7">
          <h2 className="fs-4 text-center mb-0 mb-md- mb-lg-6">Special Offer</h2>
          <div className="sale-cards d-flex">
            <div className="row">
              {products
                .filter((product) => product.tag === 'sale')
                .slice(0, 4)
                .map((product) => (
                  <div className="col-6 col-lg-3 mt-2 mt-sm-4 mt-lg-0" key={product.id}>
                    <ProductCard product={product} colNum={4} key={product.id} />
                  </div>
                  // <div className="col-3" key={product.id}>
                  //   <div className="card w-100 border-0" style={{ width: '18rem' }}>
                  //     <div
                  //         className="card-header px-0"
                  //         style={{
                  //           backgroundImage: `url(${product.imageUrl})`,
                  //           backgroundSize: 'cover',
                  //           backgroundPosition: 'center',
                  //           width: '100%',
                  //           minHeight: '300px',
                  //         }}
                  //       >
                  //         <span className={`badge ${
                  //       product.tag === "sale" || product.tag === "hot"
                  //         ? "bg-danger"
                  //         : product.tag === "new"
                  //         ? "bg-warning"
                  //         : ""
                  //     }`}>{product.tag}</span>
                  //       </div>
                  //     <div className="card-body p-0 mt-3">
                  //       <h5 className="card-title">{product.title}</h5>
                  //       <p className="card-text overflow-hidden" style={{height: "50px"}}>{product.description}</p>
                  //       <Link to={`/product/${product.id}`} className="text-decoration-underline mt-1">Shop Now</Link>
                  //     </div>
                  //   </div>
                  // </div>
                ))}
            </div>
          </div>
        </section>

        <section className="section-feature py-3 py-md-5 py-lg-7 bg-secondary">
          <div className="container col-md-8">
            <div className="row">
              <div className="col-sm-4 mt-4 mt-sm-0">
                <div className="text-center">
                  <i className={`bi bi-globe-asia-australia display-1`}></i>
                  <h5 className="fs-4 mt-3">Eco-Friendly</h5>
                  <p className="mt-1">
                    Sustainable solutions for a better tomorrow.
                  </p>
                </div>
              </div>
              <div className="col-sm-4 mt-4 mt-sm-0">
                <div className="text-center">
                  <i className={`bi bi-truck-flatbed display-1`}></i>
                  <h5 className="fs-4 mt-3">24-hour delivery</h5>
                  <p className="mt-1">Fast and reliable shipping.</p>
                </div>
              </div>
              <div className="col-sm-4 mt-4 mt-sm-0">
                <div className="text-center">
                  <i className={`bi bi-house-door display-1`}></i>
                  <h5 className="fs-4 mt-3">Home Service</h5>
                  <p className="mt-1">
                    Convenience delivered straight to your door.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="section-recycle"
          style={{
            backgroundImage: 'url(/images/banner-11.jpeg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></section>

        <section className="section-bestseller py-3 py-md-5 py-lg-7">
          <div className="container col-lg-8">
            <h2 className="fs-4 text-center mb-0 mb-md-3 mb-lg-6">Best Seller</h2>
            <div className="sale-cards d-flex">
              <div className="row">
                {products
                  .filter((product) => product.tag === 'hot')
                  .slice(0, 3)
                  .map((product) => (
                    <div className="col-4 mt-4" key={product.id}>
                      <ProductCard
                        product={product}
                        colNum={3}
                        key={product.id}
                      />
                    </div>
                    // <div className="col-sm-4 mt-4 mt-sm-0" key={product.id}>
                    //   <div className="card w-100 border-0" style={{ width: '18rem' }}>
                    //     <div
                    //       className="card-header px-0"
                    //       style={{
                    //         backgroundImage: `url(${product.imageUrl})`,
                    //         backgroundSize: 'cover',
                    //         backgroundPosition: 'center',
                    //         width: '100%',
                    //         minHeight: '380px',
                    //       }}
                    //     >
                    //       <span className={`badge ${
                    //     product.tag === "sale" || product.tag === "hot"
                    //       ? "bg-danger"
                    //       : product.tag === "new"
                    //       ? "bg-warning"
                    //       : ""
                    //   }`}>{product.tag}</span>
                    //     </div>
                    //     <div className="card-body p-0 mt-3">
                    //       <h5 className="card-title">{product.title}</h5>
                    //       <p className="card-text overflow-hidden" style={{height: "50px"}}>{product.description}</p>
                    //       <Link to={`/product/${product.id}`} className="text-decoration-underline mt-1">Shop Now</Link>
                    //     </div>
                    //   </div>
                    // </div>
                  ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-award py-3 py-md-5 py-lg-7 bg-secondary">
          <div className="container">
            <h2 className="fs-4 text-center mb-0 mb-md-3 mb-lg-6">Award-winning Design</h2>
            <div className="d-flex awards justify-content-between align-items-center flex-wrap">
              {[
                'if-award-2020',
                'innovation-by-design-2021',
                'reddot-2019',
                'idea-award',
                'good-design-2023',
                'greenguard-logo',
                'forest-Stewardship-Council',
                'amazon-5star',
                'adesign-award',
              ].map((award, index) => (
                <div key={index}>
                  <img
                    src={`/images/awards/${award}.png`}
                    alt={award}
                    width={index === 2 ? '120px' : '100px'}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-new py-3 py-md-5 py-lg-7 container">
          <h2 className="fs-4 text-center mb-0 mb-md-3 mb-lg-6">New Arrivals</h2>
          <div className="sale-cards d-flex">
            <div className="row">
              {products
                .filter((product) => product.tag === 'new')
                .slice(0, 4)
                .map((product) => (
                  <div className="col-6 col-lg-3 mt-2 mt-sm-4 mt-lg-0" key={product.id}>
                    <ProductCard product={product} colNum={4} key={product.id} />
                  </div>
                  // <div className="col-3" key={product.id}>
                  //   <div className="card w-100 border-0 h-100 d-flex flex-column" style={{ width: '18rem' }}>
                  //     {/* <img
                  //       src={product.imageUrl}
                  //       className="card-img-top"
                  //       alt="..."
                  //     /> */}
                  //     <div
                  //         className="card-header px-0 border-0"
                  //         style={{
                  //           backgroundImage: `url(${product.imageUrl})`,
                  //           backgroundSize: 'cover',
                  //           backgroundPosition: 'center',
                  //           width: '100%',
                  //           height: '300px',
                  //         }}
                  //       >
                  //         <span className={`badge ${
                  //       product.tag === "sale" || product.tag === "hot"
                  //         ? "bg-danger"
                  //         : product.tag === "new"
                  //         ? "bg-warning"
                  //         : ""
                  //     }`}>{product.tag}</span>
                  //       </div>
                  //     <div className="card-body p-0 mt-3 flex-grow-1">
                  //       <div className="d-flex flex-column h-100 justify-content-between">
                  //         <h5 className="card-title">{product.title}</h5>
                  //         <p className="card-text overflow-hidden" style={{height: "50px"}}>{product.description}</p>
                  //       </div>
                  //     </div>
                  //       <div className="card-footer bg-transparent p-0 border-0">
                  //         <Link to={`/product/${product.id}`} className="text-decoration-underline mt-1">Shop Now</Link>
                  //       </div>
                  //   </div>
                  // </div>
                ))}
            </div>
          </div>
        </section>

        <section className="section-recommendation py-3 py-md-5 py-lg-7 container">
          {/* TODO: Make scrolling animation?. */}
          <h2 className="fs-4 text-center mb-0 mb-md-3 mb-lg-6">
            Recommended by 1000+ Customers
          </h2>
          <div className="row">
            <div className="col-sm-6 col-lg-3 mt-2 mt-sm-4 mt-lg-0">
              <div className="card w-100 border-0" style={{ width: '18rem' }}>
                <div className="card-body p-0">
                  <h5 className="card-title mb-2 fs-6 fw-normal">★★★★★</h5>
                  <h6 className="card-subtitle mb-3 fs-6 fw-semibold">
                    Durable and Stylish!
                  </h6>
                  <p className="card-text">
                    I purchased a coffee table, and it's been a centerpiece in
                    my living room for years. It’s as sturdy as it is beautiful!
                    Highly recommend.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3 mt-2 mt-sm-4 mt-lg-0">
              <div className="card w-100 border-0" style={{ width: '18rem' }}>
                <div className="card-body p-0">
                  <h5 className="card-title mb-2 fs-6 fw-normal">★★★★★</h5>
                  <h6 className="card-subtitle mb-3 fs-6 fw-semibold">
                    Amazing Craftsmanship!
                  </h6>
                  <p className="card-text">
                    The quality of the dining set is top-notch. You can tell
                    it’s made with care and precision. It’s the best investment
                    I’ve made for my home.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3 mt-2 mt-sm-4 mt-lg-0">
              <div className="card w-100 border-0" style={{ width: '18rem' }}>
                <div className="card-body p-0">
                  <h5 className="card-title mb-2 fs-6 fw-normal">★★★★★</h5>
                  <h6 className="card-subtitle mb-3 fs-6 fw-semibold">
                    Perfect for Any Home!
                  </h6>
                  <p className="card-text">
                    I got a lift table, and it’s been a game-changer. The design
                    is sleek, and the functionality is unmatched. Great value
                    for the price!
                  </p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3 mt-2 mt-sm-4 mt-lg-0">
              <div className="card w-100 border-0" style={{ width: '18rem' }}>
                <div className="card-body p-0">
                  <h5 className="card-title mb-2 fs-6 fw-normal">★★★★★</h5>
                  <h6 className="card-subtitle mb-3 fs-6 fw-semibold">
                    Exceptional Service!
                  </h6>
                  <p className="card-text">
                    The delivery was quick, and the furniture was packaged
                    securely. I appreciated the attention to detail from start
                    to finish.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="section-contact py-3 py-md-5 py-lg-7"
          style={{ backgroundImage: 'url(/images/contact-xl.jpeg)' }}
        >
          <div className="container section-body section-hero-body">
            <div className="text-light mt-7">
              <h1 className="fs-1">Contact Us</h1>
              <p className="fs-4 fw-light">
                Need interior design advice or customize furniture arrangement?
                Contact us.
              </p>
              <a
                className="btn btn-outline-light mt-4"
                href="mailto:support@carpento.com"
              >
                Contact
              </a>
            </div>
          </div>
        </section>
      </main>
      {/* <script type="module" src="../main.js"></script> */}
    </div>
  );
};

export default Home;
