import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination,
  EffectFade,
  Scrollbar,
  Autoplay,
} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProductCard from '../../components/ProductCard';
import REVIEWS from '../../constants/reviews';
import FullPageLoader from '../../components/FullPageLoader';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  const getProductsAll = async () => {
    setIsLoadingProducts(true);
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
      );
      setProducts(res.data.products);
      setIsLoadingProducts(false);
    } catch (error) {
      setIsLoadingProducts(false);
    }
  };

  useEffect(() => {
    AOS.init();
    getProductsAll();
  }, []);

  const [lightboxOpen, setLightboxOpen] = useState(true);

  // const openLightbox = () => {
  //   setLightboxOpen(true);
  // };

  const [email, setEmail] = useState("");

  function submitEmail(e) {
    e.preventDefault();
    setLightboxOpen(false);
    setEmail(""); // Clear input using state
  }

  if (isLoadingProducts) {
    return (
      // <main className="product container mb-6">
      <FullPageLoader />
      // </main>
    );
  }

  return (
    <div className="home">
      <main>
        <section
          className="section-hero py-6 py-lg-7"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/images/banner-6.jpeg)`,
          }}
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1000"
        >
          <div className="container section-body section-hero-body">
            <div className="text-light mt-7">
              <h1 className="display-4 text-white">Welcome to Carpento</h1>
              <p className="fs-2 text-white">Special Sales is coming soon!</p>
              <Link
                to="/products"
                className="btn btn-white bg-transparent text-white border-white mt-4"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </section>

        {lightboxOpen && (
          <div
            className="position-fixed top-0 start-0 bottom-0 end-0 bg-dark bg-opacity-25 d-flex align-items-center justify-content-center"
            style={{ zIndex: 1050 }}
            // onClick={() => setLightboxOpen(false)}
          >
            <div className="position-relative col-10 col-md-8 col-xl-6 mx-3 shadow">
              {/* <img
                    src={`${process.env.PUBLIC_URL}/images/banner-3.jpeg`}
                    className="w-100 h-auto"
                    alt="Lightbox view"
                  /> */}
              <div className="bg-light p-4 p-md-6">
                <h2><span className="pe-1">Join Us for Exclusive Deals!</span><i className="bi bi-tags-fill"></i></h2>
                <p className="mt-2 mt-md-4">Be the first to access:</p>
                <ul className="ps-2">
                  <li className="mt-md-1">Special discounts & early access to sales</li>
                  <li className="mt-md-1">Exciting new product launches</li>
                </ul>
                <form className="input-group mt-2 mt-md-5 mb-1" onSubmit={submitEmail}>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Enter your email"
                    aria-describedby="basic-addon2"
                  />
                  <button className="input-group-text" id="basic-addon2">
                    Enter
                  </button>
                </form>
                <small className="text-body-secondary">We respect your privacy. No spam, just great content.</small>
              </div>
              <button
                className="btn btn-transparent position-absolute top-0 end-0 m-1 m-md-2"
                style={{
                  width: '30px',
                  height: '30px',
                  padding: '1px 0px 0px 2px',
                }}
                onClick={() => setLightboxOpen(false)}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
          </div>
        )}

        <section
          className="section-sale container py-6 py-lg-7"
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-duration="600"
        >
          <h2 className="fs-4 text-center mb-0 mb-lg-6">Special Offer</h2>
          <div className="sale-cards d-flex">
            <div className="row">
              {products
                .filter((product) => product.tag === 'sale')
                .slice(0, 4)
                .map((product) => (
                  <div
                    className="col-12 col-sm-6 col-lg-3 mt-2 mt-sm-4 mt-lg-0"
                    key={product.id}
                  >
                    <div className="mt-4 mt-sm-0 h-100">
                      <ProductCard
                        product={product}
                        colNum={4}
                        key={product.id}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <section className="section-feature py-6 py-lg-7 bg-secondary">
          <div className="container col-md-8">
            <div className="row g-4 g-sm-0">
              <div className="col-sm-4">
                <div className="text-center">
                  <i className={`bi bi-globe-asia-australia display-1`}></i>
                  <h5 className="fs-4 mt-3">Eco-Friendly</h5>
                  <p className="mt-1">
                    Sustainable solutions for a better tomorrow.
                  </p>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="text-center">
                  <i className={`bi bi-truck-flatbed display-1`}></i>
                  <h5 className="fs-4 mt-3">24-hour delivery</h5>
                  <p className="mt-1">Fast and reliable shipping.</p>
                </div>
              </div>
              <div className="col-sm-4">
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
            backgroundImage: `url(${process.env.PUBLIC_URL}/images/banner-11.jpeg)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></section>

        <section
          className="section-bestseller py-6 py-lg-7"
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-duration="600"
        >
          <div className="container col-sm-6 col-lg-12 col-xl-8">
            <h2 className="fs-4 text-center mb-0 mb-md-3 mb-lg-6">
              Best Seller
            </h2>
            <div className="sale-cards d-flex">
              <div className="row">
                {products
                  .filter((product) => product.tag === 'hot')
                  .slice(0, 3)
                  .map((product) => (
                    <div
                      className="col-12 col-lg-4 mt-2 mt-sm-4 mt-lg-0"
                      key={product.id}
                    >
                      <div className="mt-4 mt-sm-0 h-100">
                        <ProductCard
                          product={product}
                          colNum={3}
                          key={product.id}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-award py-6 py-lg-7 bg-secondary">
          <div className="container col-10 col-sm-12 col-md-10 col-xl-12">
            <h2 className="fs-4 text-center mb-2 mb-md-3 mb-lg-6">
              Award-winning Design
            </h2>
            <div className="row align-items-center">
              <div className="col-6 col-sm-3 col-xl text-center mt-2 mt-sm-4">
                <img
                  src={`${process.env.PUBLIC_URL}/images/awards/if-award-2020.png`}
                  className="img-grayscale"
                  alt="if-award-2020"
                  width="120px"
                />
              </div>
              <div className="col-6 col-sm-3 col-xl text-center mt-2 mt-sm-4">
                <img
                  src={`${process.env.PUBLIC_URL}/images/awards/innovation-by-design-2021.png`}
                  className="img-grayscale"
                  alt="innovation-by-design-2021"
                  width="60px"
                />
              </div>
              <div className="col-6 col-sm-3 col-xl text-center mt-2 mt-sm-4">
                <img
                  src={`${process.env.PUBLIC_URL}/images/awards/reddot-2019.png`}
                  className="img-grayscale"
                  alt="reddot-2019"
                  width="170px"
                />
              </div>
              <div className="col-6 col-sm-3 col-xl text-center mt-2 mt-sm-4">
                <img
                  src={`${process.env.PUBLIC_URL}/images/awards/idea-award.png`}
                  className="img-grayscale"
                  alt="idea-award"
                  width="110px"
                />
              </div>
              <div className="col-6 col-sm-3 col-xl text-center mt-2 mt-sm-4">
                <img
                  src={`${process.env.PUBLIC_URL}/images/awards/good-design-2023.png`}
                  className="img-grayscale"
                  alt="good-design-2023"
                  width="140px"
                />
              </div>
              <div className="col-6 col-sm-3 col-xl text-center mt-2 mt-sm-4">
                <img
                  src={`${process.env.PUBLIC_URL}/images/awards/greenguard-logo.png`}
                  className="img-grayscale"
                  alt="greenguard-logo"
                  width="90px"
                />
              </div>
              <div className="col-6 col-sm-3 col-xl text-center mt-2 mt-sm-4">
                <img
                  src={`${process.env.PUBLIC_URL}/images/awards/forest-Stewardship-Council.png`}
                  className="img-grayscale"
                  alt="forest-Stewardship-Council"
                  width="130px"
                />
              </div>
              <div className="col-6 col-sm-3 col-xl text-center mt-2 mt-sm-4">
                <img
                  src={`${process.env.PUBLIC_URL}/images/awards/adesign-award.png`}
                  className="img-grayscale"
                  alt="adesign-award"
                  width="70px"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          className="section-new py-6 py-lg-7 container"
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-duration="600"
        >
          <h2 className="fs-4 text-center mb-0 mb-md-3 mb-lg-6">
            New Arrivals
          </h2>
          <div className="sale-cards d-flex">
            <div className="row">
              {products
                .filter((product) => product.tag === 'new')
                .slice(0, 4)
                .map((product) => (
                  <div
                    className="col-12 col-sm-6 col-lg-3 mt-2 mt-sm-4 mt-lg-0"
                    key={product.id}
                  >
                    <div className="mt-4 mt-sm-0 h-100">
                      <ProductCard
                        product={product}
                        colNum={4}
                        key={product.id}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <section className="section-recommendation py-6 py-lg-7 container">
          <h2 className="fs-4 text-center mb-3 mb-lg-6">
            Recommended by 1000+ Customers
          </h2>
          <Swiper
            className="m-0 w-100"
            modules={[Navigation, Pagination, EffectFade, Scrollbar, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true, hide: true }}
            loop
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              992: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 4,
              },
            }}
          >
            {REVIEWS.map((review, index) => (
              <SwiperSlide key={index} className="mb-5">
                <div className="card w-100 border-0">
                  <div className="card-body p-0">
                    <h5 className="card-title mb-2 fs-6 fw-normal">★★★★★</h5>
                    <h6 className="card-subtitle mb-3 fs-6 fw-semibold">
                      {review.title}
                    </h6>
                    <p className="card-text">{review.content}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section
          className="section-contact py-6 py-lg-7"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/images/contact-xl.jpeg)`,
          }}
        >
          <div className="container section-body section-hero-body">
            <div className="text-white mt-7">
              <h1 className="fs-1">Contact Us</h1>
              <p className="fs-4 fw-light text-white">
                Need interior design advice or customize furniture arrangement?
                Contact us.
              </p>
              <a
                className="btn btn-white bg-transparent text-white border-white mt-4"
                href="mailto:support@carpento.com"
              >
                Contact
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
