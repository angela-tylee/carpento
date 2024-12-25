// import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className="home">
      <main>
        <section className="section-hero" style={{ backgroundImage: 'url(/images/banner-6.jpeg)' }}>
          <div className="container section-body section-hero-body">
            <div className="text-light mt-7">
              <h1 className="display-4">Welcome to Carpento</h1>
              <p className="fs-2">Special Sales is coming soon!</p>
              <Link to="/products" className="btn btn-outline-light mt-4">Shop Now</Link>
            </div>
          </div>
        </section>

        <section className="section-sale container">
          <h2 className="fs-4 text-center mb-6">Special Offer</h2>
          <div className="sale-cards d-flex">
            <div className="row">
              {Array.from({ length: 4 }, (_, index) => (
                <div className="col-3" key={index}>
                  <div className="card w-100 border-0" style={{ width: '18rem' }}>
                    <img
                      src={`/images/products/living-room/product-${index + 1}.jpeg`}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body p-0 mt-3">
                      <h5 className="card-title fs-4">Card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="#" className="text-decoration-underline mt-1">Shop Now</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-feature bg-secondary">
          <div className="container">
            <div className="row">
              {['Eco-Friendly', '24-hour delivery', 'Home Service'].map((feature, index) => (
                <div className="col-4" key={index}>
                  <div className="text-center">
                    <i className={`bi bi-${feature.replace(/ /g, '-').toLowerCase()} display-1`}></i>
                    <h5 className="fs-4 mt-3">{feature}</h5>
                    <p className="mt-1">Lorem ipsum dolor sit amet.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-recycle" style={{ backgroundImage: 'url(/images/banner-11.jpeg)' }}>
          {/* Additional content can be added here */}
        </section>

        <section className="section-bestseller">
          <div className="container">
            <h2 className="fs-4 text-center mb-6">Best Seller</h2>
            <div className="sale-cards d-flex">
              <div className="row">
                {Array.from({ length: 3 }, (_, index) => (
                  <div className="col-4" key={index}>
                    <div className="card w-100 border-0" style={{ width: '18rem' }}>
                      <img
                        src={`/images/products/living-room/best-seller-${index + 1}.jpeg`}
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body p-0 mt-3">
                        <h5 className="card-title fs-4">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="text-decoration-underline mt-1">Shop Now</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-award bg-secondary">
          <div className="container">
            <h2 className="fs-4 text-center mb-6">Award-winning Design</h2>
            <div className="d-flex awards justify-content-between align-items-center flex-wrap">
              {['if-award-2020', 'innovation-by-design-2021', 'reddot-2019', 'idea-award', 'good-design-2023', 'greenguard-logo', 'forest-Stewardship-Council', 'amazon-5star', 'adesign-award'].map((award, index) => (
                <div key={index}>
                  <img src={`/images/awards/${award}.png`} alt={award} width={index === 2 ? '120px' : '100px'} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-new container">
          <h2 className="fs-4 text-center mb-6">New Arrivals</h2>
          <div className="sale-cards d-flex">
            <div className="row">
              {Array.from({ length: 4 }, (_, index) => (
                <div className="col-3" key={index}>
                  <div className="card w-100 border-0" style={{ width: '18rem' }}>
                    <img
                      src={`/images/products/dining/new-arrival-${index + 1}.jpeg`}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body p-0 mt-3">
                      <h5 className="card-title fs-4">Card title</h5>
                      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="#" className="text-decoration-underline mt-1">Shop Now</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-recommendation container">
          {/* TODO: Make it scrollable. */}
          <h2 className="fs-4 text-center mb-6">Recommended by 1000+ Customers</h2>
          <div className="row">
            {Array.from({ length: 4 }, (_, index) => (
              <div className="col-3" key={index}>
                <div className="card w-100 border-0" style={{ width: '18rem' }}>
                  <div className="card-body p-0">
                    <h5 className="card-title mb-2 fs-6 fw-normal">★★★★★</h5>
                    <h6 className="card-subtitle mb-3 fs-6 fw-semibold">EXCELLENT QUALITY</h6>
                    <p className="card-text">This is the best furniture brand of all times! I’ve used the dining table for 7 years, and it’s still solid and has no scratches!</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-contact" style={{ backgroundImage: 'url(/images/contact-xl.jpeg)' }}>
          <div className="container section-body section-hero-body">
            <div className="text-light mt-7">
              <h1 className="fs-1">Contact Us</h1>
              <p className="fs-4 fw-light">Need interior design advice or customize furniture arrangement? Contact us.</p>
              <a className="btn btn-outline-light mt-4" href="mailto:support@carpento.com">Contact</a>
            </div>
          </div>
        </section>
      </main>
      {/* <script type="module" src="../main.js"></script> */}
    </div>
  );
};

export default Home;
