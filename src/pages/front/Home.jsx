import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

const Home = () => {
  const [products, setProducts] = useState([]);

  const getProductsAll = async (page = 1) => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
    );

    console.log('products', res);
    setProducts(res.data.products);
  };

  useEffect(() => {
    AOS.init();
    getProductsAll();
  }, []);

  return (
    <div className="home">
      <main>
        <section
          className="section-hero py-3 py-sm-5 py-lg-7"
          style={{ backgroundImage: 'url(/images/banner-6.jpeg)' }}
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1500"
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

        <section
          className="section-sale container py-3 py-sm-5 py-lg-7"
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-duration="1500"
        >
          <h2 className="fs-4 text-center mb-0 mb-md- mb-lg-6">
            Special Offer
          </h2>
          <div className="sale-cards d-flex">
            <div className="row">
              {products
                .filter((product) => product.tag === 'sale')
                .slice(0, 4)
                .map((product) => (
                  <div
                    className="col-6 col-lg-3 mt-2 mt-sm-4 mt-lg-0"
                    key={product.id}
                  >
                    <ProductCard
                      product={product}
                      colNum={4}
                      key={product.id}
                    />
                  </div>
                ))}
            </div>
          </div>
        </section>

        <section className="section-feature py-3 py-sm-5 py-lg-7 bg-secondary">
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

        <section
          className="section-bestseller py-3 py-sm-5 py-lg-7"
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-duration="1500"
        >
          <div className="container col-lg-8">
            <h2 className="fs-4 text-center mb-0 mb-md-3 mb-lg-6">
              Best Seller
            </h2>
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
                  ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-award py-3 py-sm-5 py-lg-7 bg-secondary">
          <div className="container col-10 col-sm-12 col-md-10 col-xl-12">
            <h2 className="fs-4 text-center mb-2 mb-md-3 mb-lg-6">
              Award-winning Design
            </h2>
            <div className="row align-items-center">
              <div className="col-6 col-sm-3 col-xl text-center mt-2 mt-sm-4">
                <img
                  src="/images/awards/if-award-2020.png"
                  className="img-grayscale"
                  alt="if-award-2020"
                  width="120px"
                />
              </div>
              <div className="col-6 col-sm-3 col-xl text-center mt-2 mt-sm-4">
                <img
                  src="/images/awards/innovation-by-design-2021.png"
                  className="img-grayscale"
                  alt="innovation-by-design-2021"
                  width="60px"
                />
              </div>
              <div className="col-6 col-sm-3 col-xl text-center mt-2 mt-sm-4">
                <img
                  src="/images/awards/reddot-2019.png"
                  className="img-grayscale"
                  alt="reddot-2019"
                  width="170px"
                />
              </div>
              <div className="col-6 col-sm-3 col-xl text-center mt-2 mt-sm-4">
                <img
                  src="/images/awards/idea-award.png"
                  className="img-grayscale"
                  alt="idea-award"
                  width="110px"
                />
              </div>
              <div className="col-6 col-sm-3 col-xl text-center mt-2 mt-sm-4">
                <img
                  src="/images/awards/good-design-2023.png"
                  className="img-grayscale"
                  alt="good-design-2023"
                  width="140px"
                />
              </div>
              <div className="col-6 col-sm-3 col-xl text-center mt-2 mt-sm-4">
                <img
                  src="/images/awards/greenguard-logo.png"
                  className="img-grayscale"
                  alt="greenguard-logo"
                  width="90px"
                />
              </div>
              <div className="col-6 col-sm-3 col-xl text-center mt-2 mt-sm-4">
                <img
                  src="/images/awards/forest-Stewardship-Council.png"
                  className="img-grayscale"
                  alt="forest-Stewardship-Council"
                  width="130px"
                />
              </div>
              <div className="col-6 col-sm-3 col-xl text-center mt-2 mt-sm-4">
                <img
                  src="/images/awards/adesign-award.png"
                  className="img-grayscale"
                  alt="adesign-award"
                  width="70px"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          className="section-new py-3 py-sm-5 py-lg-7 container"
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-duration="1500"
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
                    className="col-6 col-lg-3 mt-2 mt-sm-4 mt-lg-0"
                    key={product.id}
                  >
                    <ProductCard
                      product={product}
                      colNum={4}
                      key={product.id}
                    />
                  </div>
                ))}
            </div>
          </div>
        </section>

        <section className="section-recommendation py-3 py-sm-5 py-lg-7 container"
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-duration="1500"
        >
          {/* TODO: Make scrolling animation?. */}
          <h2 className="fs-4 text-center mb-3 mb-lg-6">
            Recommended by 1000+ Customers
          </h2>
          <Swiper
            className="m-0 w-100"
            modules={[Navigation, Pagination, EffectFade, Scrollbar, Autoplay]}
            spaceBetween={24} // space between slides
            slidesPerView={1} // number of products per slide
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true, hide: true }}
            loop
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              568: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              992: {
                slidesPerView: 4,
              },
            }}
          >
            {/* {recentlySeenProducts.slice(0, 10).map((item) => (
                  <SwiperSlide key={item.id} className="mb-5">
                    <ProductCard2 product={item} hasFooter={false} />
                  </SwiperSlide>
                ))} */}
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
          {/* TODO: Separate CSS */}
          <style>
            {`
          .swiper-wrapper {
            width: 320px;
          }
          
          @media (min-width: 768px) {
            .swiper-wrapper {
              width: 768px;
            }
          }
          @media (min-width: 992px) {
            .swiper-wrapper {
              width: 992px;
            }
          }
        `}
          </style>
          {/* <div className="row">
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
          </div> */}
        </section>

        <section
          className="section-contact py-3 py-sm-5 py-lg-7"
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
