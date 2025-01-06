import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

const Product = () => {
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const [cartQuantity, setCartQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getProduct = async (id) => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`
    );
    console.log(res);
    setProduct(res.data.product);
  };

  const getProducts = async () => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
    );
    console.log(res);
    setProducts(res.data.products);
  };

  const addToCart = async () => {
    const data = {
      data: {
        product_id: product.id,
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

  useEffect(() => {
    // QUESTION: React Hook useEffect has a missing dependency...https://courses.hexschool.com/courses/react-video-course/lectures/45744008 07:00
    getProduct(id);
    getProducts();
  }, [id]);

  return (
    <main className="product container mb-6">
      {/* TODO: Separate breadcrumb component */}
      {/* TODO: Add links */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          {/* TODO: Make first letter capitalized */}
          <li className="breadcrumb-item">{product.category}</li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.title}
          </li>
        </ol>
      </nav>

      <section className="section-product">
        <div className="row">
          <div className="col-6">
            <div className="me-7">
              <div className="row">
                <div className="col-2">
                  <img
                    src="../assets/images/products/decoration/fake-plant-1.jpeg"
                    className="w-100 mb-2"
                    alt="Fake Plant 1"
                  />
                  <img
                    src="../assets/images/products/decoration/fake-plant-2.jpeg"
                    className="w-100 mb-2"
                    alt="Fake Plant 2"
                  />
                </div>
                <div className="col-10">
                  <img
                    src={product.imageUrl}
                    className="w-100"
                    alt="Fake Plant 3"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-6">
            <h1 className="fs-2">{product.title}</h1>
            <p className="fs-5 mt-1">
              <span className="text-primary me-1">
                ${product.price?.toLocaleString()}{' '}
              </span>
              <del> ${product.origin_price?.toLocaleString()}</del>
            </p>
            <p className="mt-2">{product.description}</p>

            <div className="mt-3 w-100 d-flex align-items-center">
              {/* TODO: 元件化？ Separate quantity component -> Cart.jsx*/}
              <div className="input-group w-25">
                <button
                  className="btn btn-outline-secondary text-dark"
                  type="button"
                  id="button-addon1"
                  onClick={() =>
                    setCartQuantity((pre) => (pre === 1 ? pre : pre - 1))
                  }
                >
                  <i className="bi bi-dash-lg "></i>
                </button>
                <input
                  type="text"
                  className="form-control text-center"
                  placeholder=""
                  aria-label=""
                  value={cartQuantity}
                  readOnly
                />
                <button
                  className="btn btn-outline-secondary text-dark"
                  type="button"
                  id="button-addon1"
                  onClick={() => setCartQuantity((pre) => pre + 1)}
                >
                  <i className="bi bi-plus-lg"></i>
                </button>
              </div>
              <button
                type="button"
                className="btn btn-primary w-25 ms-2"
                onClick={addToCart}
                disabled={isLoading}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-info pt-5 pb-6 border-bottom border-1 border-secondary">
        <div className="col-9 section-info-tabs">
          {/* <h2 className="fs-5 fw-bold border-bottom border-3 border-black d-inline px-1 py-1">Info</h2> */}
          {/* <p className="mt-5">{product.content}</p> */}
          {/* TODO: 拆分成：Info (Overview, Features), Size (Dimension), Maintenance (Care) */}
          {/* <p className="mt-5 product-content" dangerouslySetInnerHTML={{ __html: product.content }}></p> */}
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home-tab-pane"
                type="button"
                role="tab"
                aria-controls="info-tab-pane"
                aria-selected="true"
              >
                <h5>Info</h5>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile-tab-pane"
                type="button"
                role="tab"
                aria-controls="size-tab-pane"
                aria-selected="false"
              >
                <h5>Size</h5>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="contact-tab"
                data-bs-toggle="tab"
                data-bs-target="#contact-tab-pane"
                type="button"
                role="tab"
                aria-controls="maintenance-tab-pane"
                aria-selected="false"
              >
                <h5>Care Instructions</h5>
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home-tab-pane"
              role="tabpanel"
              aria-labelledby="home-tab"
              tabIndex="0"
            >
              <p
                className="mt-5 ps-2 product-content"
                dangerouslySetInnerHTML={{ __html: product.content?.info }}
              ></p>
            </div>
            <div
              className="tab-pane fade"
              id="profile-tab-pane"
              role="tabpanel"
              aria-labelledby="profile-tab"
              tabIndex="0"
            >
              <p
                className="mt-5 ps-2 product-content"
                dangerouslySetInnerHTML={{ __html: product.content?.size }}
              ></p>
            </div>
            <div
              className="tab-pane fade"
              id="contact-tab-pane"
              role="tabpanel"
              aria-labelledby="contact-tab"
              tabIndex="0"
            >
              <p
                className="mt-5 ps-2 product-content"
                dangerouslySetInnerHTML={{
                  __html: product.content?.maintenance,
                }}
              ></p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-related pt-2">
        <h2 className="fs-5 fw-bold border-bottom border-3 border-black d-inline px-1 py-1">
          You might also need...
        </h2>
        <div className="mt-5">
          {/* Swiper Component */}
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10} // space between slides
            slidesPerView={5} // number of products per slide
            // loop={true} // enable infinite loop
            navigation={true} // enable navigation buttons
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            breakpoints={{
              // Responsive breakpoints
              320: {
                slidesPerView: 1, // 1 product per slide on small screens
              },
              768: {
                slidesPerView: 2, // 2 products per slide on medium screens
              },
              1024: {
                slidesPerView: 5, // 4 products per slide on large screens
              },
            }}
          >
            <div className="row">
              {products
                .filter(
                  (item) => item.category === product.category && item.id !== id
                )
                // .slice(0, 8)
                .map((item) => (
                  <SwiperSlide key={item.id}>
                    {/* <div className="col-12 col-md-3"> */}
                    <div className="card w-100 border-0">
                      <img
                        src={item.imageUrl}
                        className="card-img-top"
                        alt={item.title}
                      />
                      <div className="card-body p-0 mt-2">
                        <h5 className="card-title fs-6 fw-bold">
                          {item.title}
                        </h5>
                        <div className="card-text">
                          <span className="text-primary">$1,500</span>
                          <del>$2,000</del>
                        </div>
                        <div className="d-flex w-100 mt-2">
                          <input
                            type="number"
                            name=""
                            id=""
                            className="form-control w-25 text-center"
                          />
                          <button
                            type="button"
                            className="btn btn-primary ms-1 w-75"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* </div> */}
                  </SwiperSlide>
                ))}
            </div>
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
            <div className="swiper-scrollbar"></div>
          </Swiper>
          {/* <div className="row">
            {products
              .filter(item => item.category === product.category && item.id !== id)
              .slice(0, 4)
              .map(item => (
                <div className="col-3" key={item.id}>
                  <div
                    className="card w-100 border-0"
                    style={{ width: '18rem' }}
                  >
                    <img
                      src={item.imageUrl}
                      className="card-img-top"
                      alt="Product"
                    />
                    <div className="card-body p-0 mt-2">
                      <h5 className="card-title fs-6 fw-bold">{item.title}</h5>
                      <div className="card-text">
                        <span className="text-primary">$1,500</span>
                        <del>$2,000</del>
                      </div>
                      <div className="d-flex w-100 mt-2">
                        <input
                          type="number"
                          name=""
                          id=""
                          className="form-control w-25 text-center"
                        />
                        <button
                          type="button"
                          className="btn btn-primary ms-1 w-75"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div> */}
        </div>
      </section>
    </main>
  );
};

export default Product;
