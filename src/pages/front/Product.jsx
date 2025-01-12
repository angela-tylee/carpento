import { Link, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProductCard2 from '../../components/ProductCard2';
import { CartContext } from '../../context/CartContext';

// import '../../assets/scss/components/_swiper.scss';

const Product = () => {
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  // const [cart, setCart] = useState({
  //   carts: [],
  // });
  const [cartQuantity, setCartQuantity] = useState(1);
  // const [isLoading, setIsLoading] = useState(false);
  const { cart, addToCart, isLoading } = useContext(CartContext);

  const getProduct = async (id) => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`
    );
    console.log(res);
    setProduct(res.data.product);
  };

  const getProductsAll = async () => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
    );
    console.log(res);
    setProducts(res.data.products);
  };

  // const getCart = async () => {
  //   const res = await axios.get(
  //     `/v2/api/${process.env.REACT_APP_API_PATH}/cart`
  //   );
  //   console.log('cart', res.data.data);
  //   setCart(res.data.data);
  // };

  // const addToCart = async () => {
  //   const data = {
  //     data: {
  //       product_id: product.id,
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

  useEffect(() => {
    // QUESTION: React Hook useEffect has a missing dependency...https://courses.hexschool.com/courses/react-video-course/lectures/45744008 07:00
    getProduct(id);
    getProductsAll();
    // getCart();
  }, [id]);

  const [recentlySeenProducts, setRecentlySeenProducts] = useState([]);

  const getRecentlySeen = () => {
    const recentlySeen = localStorage.getItem('recentlySeen');
    return recentlySeen ? JSON.parse(recentlySeen) : [];
  };

  const addRecentlySeen = (product) => {
    const recentlySeen = getRecentlySeen();
    // Remove the product if it already exists
    const updatedRecentlySeen = recentlySeen.filter((p) => p.id !== product.id);
    // Add the product to the beginning of the array
    updatedRecentlySeen.unshift(product);
    // Store back in localStorage
    localStorage.setItem('recentlySeen', JSON.stringify(updatedRecentlySeen));
  };

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openLightbox = (image) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  useEffect(() => {
    // Find the full product object by ID
    const productViewed = products.find((p) => p.id === id);
    if (productViewed) {
      addRecentlySeen(productViewed);
    }
    // addRecentlySeen(id);
    const items = getRecentlySeen();
    setRecentlySeenProducts(items);
    console.log(items, recentlySeenProducts);
  }, [id]);

  return (
    <main className="product container mb-6">
      {/* TODO: Separate breadcrumb component */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link
              to={`/products?category=${encodeURIComponent(product.category)}`}
            >
              {product.category}
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.title}
          </li>
        </ol>
      </nav>

      <section className="section-product">
        <div className="row">
          <div className="col-md-5">
            {/* <div className="row me-md-7">
              <div className="col-2">
                <img
                  src="../assets/images/products/decoration/fake-plant-1.jpeg"
                  className="w-100 mb-2 pointer opacity-hover"
                  alt="Fake Plant 1"
                  onClick={() =>
                    openLightbox(
                      '../assets/images/products/decoration/fake-plant-1.jpeg'
                    )
                  }
                />
                <img
                  src="../assets/images/products/decoration/fake-plant-2.jpeg"
                  className="w-100 mb-2 pointer opacity-hover"
                  alt="Fake Plant 2"
                  onClick={() =>
                    openLightbox(
                      '../assets/images/products/decoration/fake-plant-2.jpeg'
                    )
                  }
                />
              </div>
              <div className="col-10">
                <img
                  src={product.imageUrl}
                  className="w-100 pointer opacity-hover"
                  alt="Fake Plant 3"
                  onClick={() => openLightbox(product.imageUrl)}
                />
              </div>
            </div> */}
            <div className="row flex-column-reverse flex-md-row">
              <div
                className={`${
                  product?.imagesUrl?.length > 1 ? 'col-12 col-md-2' : 'd-none'
                } mt-2 mt-md-0`}
              >
                <div className="row g-2">
                  {product?.imagesUrl?.slice(1).map((imageUrl, index) => (
                    <div className="col-3 col-md-12">
                      <img
                        src={imageUrl}
                        className="w-100 pointer opacity-hover"
                        alt={`${product.title}-${index + 2}`}
                        onClick={() => openLightbox(imageUrl)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div
                className={`${
                  product?.imagesUrl?.length > 1 ? 'col-md-10' : 'col-12'
                }`}
              >
                <img
                  src={(product.imagesUrl && product.imagesUrl[0]) || ''}
                  className="w-100 pointer opacity-hover"
                  alt={`${product.title}-1`}
                  onClick={() =>
                    openLightbox(
                      (product.imagesUrl && product.imagesUrl[0]) || ''
                    )
                  }
                />
              </div>
            </div>
          </div>

          {/* FIXME: height over 100vh */}
          {lightboxOpen && (
            <div
              className="position-fixed top-0 start-0 bottom-0 end-0 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center"
              style={{ zIndex: 1050 }}
              onClick={() => setLightboxOpen(false)}
            >
              <div className="position-relative col-10 col-md-8 col-xl-7 col-xxl-5 mx-3">
                <img
                  src={selectedImage}
                  className="w-100 h-auto"
                  alt="Lightbox view"
                />
                <button
                  className="position-absolute top-0 end-0 m-3 mt-2 btn btn-dark rounded-circle opacity-75"
                  style={{ width: '40px', height: '40px' }}
                  onClick={() => setLightboxOpen(false)}
                >
                  ×
                </button>
              </div>
            </div>
          )}

          <style>
            {/* TODO: Separate CSS */}
            {`
              .pointer { cursor: pointer; }
              .opacity-hover:hover { opacity: 0.8; transition: opacity 0.3s; }
            `}
          </style>

          <div className="col-md-7">
            <div className="ms-md-3 ms-lg-6">
              <h1 className="fs-2 mt-2 mt-sm-4 mt-md-0">{product.title}</h1>
              <p className="fs-5 mt-1">
                <span className="text-primary me-1">
                  ${product.price?.toLocaleString()}{' '}
                </span>
                <del> ${product.origin_price?.toLocaleString()}</del>
              </p>
              <p className="mt-2">{product.description}</p>
              <div className="mt-3 w-100 d-flex align-items-center d-none d-md-flex">
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
                  onClick={() => {
                    addToCart(product.id, cartQuantity);
                    console.log('click', product.id, cartQuantity);
                  }}
                  disabled={isLoading}
                >
                  <div
                    className={`spinner-border spinner-border-sm text-light opacity-50 me-1 ${
                      isLoading ? '' : 'd-none'
                    }`}
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-info pt-2 pb-3 pt-md-5 pb-md-6 border-bottom border-1 border-secondary">
        <div className="col-12 section-info-tabs">
          {/* <h2 className="fs-5 fw-bold border-bottom border-3 border-black d-inline px-1 py-1">Info</h2> */}
          {/* <p className="mt-5">{product.content}</p> */}
          {/* <p className="mt-5 product-content" dangerouslySetInnerHTML={{ __html: product.content }}></p> */}
          <ul
            className="nav nav-tabs flex-column flex-sm-row"
            id="myTab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className="nav-link w-100 w-sm-auto active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home-tab-pane"
                type="button"
                role="tab"
                aria-controls="info-tab-pane"
                aria-selected="true"
              >
                <h5 className="text-start text-md-center">Info</h5>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link w-100 w-sm-auto"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile-tab-pane"
                type="button"
                role="tab"
                aria-controls="size-tab-pane"
                aria-selected="false"
              >
                <h5 className="text-start text-md-center">Size</h5>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link w-100 w-sm-auto"
                id="contact-tab"
                data-bs-toggle="tab"
                data-bs-target="#contact-tab-pane"
                type="button"
                role="tab"
                aria-controls="maintenance-tab-pane"
                aria-selected="false"
              >
                <h5 className="text-start text-md-center">Care Instructions</h5>
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

      {/* mobile start*/}
      <div className="mt-3 w-100 d-flex justify-content-between sticky-bottom d-md-none py-2 bg-light">
        {/* TODO: cart 元件化 */}
        <Link to="/cart" className="nav-link me-2" role="button">
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
          type="button"
          className="btn btn-primary w-100"
          onClick={() => addToCart(product.id, cartQuantity)}
          disabled={isLoading}
        >
          Add to Cart
        </button>
      </div>
      {/* mobile end */}

      {recentlySeenProducts.length === 0 ? (
        ''
      ) : (
        // TODO: 資料沒有及時更新
        <section className="section-seen pt-2 d-none d-xxl-block">
          <h2 className="fs-5 fw-bold border-bottom border-3 border-black d-inline px-1 py-1">
            Recently Seen
          </h2>
          <div className="mt-5">
            <Swiper
              modules={[Navigation, Pagination, EffectFade]}
              spaceBetween={12} // space between slides
              slidesPerView={5} // number of products per slide
              navigation // enable navigation buttons
              pagination={{ clickable: true }}
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
                {recentlySeenProducts.slice(0, 10).map((item) => (
                  <SwiperSlide key={item.id} className="mb-5">
                    {/* <div className="col-12 col-md-3"> */}
                    <ProductCard2 product={item} hasFooter={false} />
                    {/* <Link className="card w-100 border-0" to={`/product/${item.id}`}>
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
                      </div>
                    </Link> */}
                    {/* </div> */}
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
          </div>
        </section>
      )}
      {!products.some(
        (item) => item.category === product.category && item.id !== id
      ) ? (
        ''
      ) : (
        <section className="section-related pt-2 d-none d-xxl-block">
          <h2 className="fs-5 fw-bold border-bottom border-3 border-black d-inline px-1 py-1">
            You might also need...
          </h2>
          <div className="mt-5">
            {/* Swiper Component */}
            <Swiper
              modules={[Navigation, Pagination, EffectFade]}
              // effect="fade"
              spaceBetween={12} // space between slides
              slidesPerView={5} // number of products per slide
              // loop={true} // enable infinite loop
              navigation // enable navigation buttons
              // navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
              pagination={{ clickable: true }}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
              breakpoints={{
                // Responsive breakpoints
                320: {
                  slidesPerView: 1, // 1 product per slide on small screens
                },
                576: {
                  slidesPerView: 3, // 2 products per slide on medium screens
                },
                1024: {
                  slidesPerView: 5, // 5 products per slide on large screens
                },
              }}
            >
              <div className="row">
                {products
                  .filter(
                    (item) =>
                      item.category === product.category && item.id !== id
                  )
                  // .slice(0, 8)
                  .map((item) => (
                    <SwiperSlide key={item.id} className="mb-5">
                      {/* <div className="col-12 col-md-3"> */}
                      <ProductCard2 product={item} hasFooter={false} />
                      {/* <Link className="card w-100 border-0" to={`/product/${item.id}`}>
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
                      </div>
                    </Link> */}
                      {/* </div> */}
                    </SwiperSlide>
                  ))}
              </div>
              {/* <div className="swiper-button-prev">prev</div> */}
              {/* <div className="swiper-button-next">next</div> */}
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
      )}
    </main>
  );
};

export default Product;
