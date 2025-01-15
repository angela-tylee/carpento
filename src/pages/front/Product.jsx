import { Link, useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProductCard2 from '../../components/ProductCard2';
import { CartContext } from '../../context/CartContext';
import Message from '../../components/Message';
import { MessageContext } from '../../context/MessageContext';
// import PulseLoader from 'react-spinners/PulseLoader';
import FullPageLoader from '../../components/FullPageLoader';
// import { useMessage } from '../../context/MessageContext';
// import useMessage from '../../hooks/useMessage';

// import '../../assets/scss/components/_swiper.scss';

const Product = () => {
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  // const [cart, setCart] = useState({
  //   carts: [],
  // });
  const [cartQuantity, setCartQuantity] = useState(1);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const { cart, addToCart, isLoading } = useContext(CartContext);
  const { messageType, message } = useContext(MessageContext);
  // const { messageType, message } = useMessage();

  const getProduct = async (id) => {
    setIsLoadingProduct(true);
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`
      );
      console.log(res);
      setProduct(res.data.product);

      setIsLoadingProduct(false);
    } catch (error) {
      console.log(error);
      setIsLoadingProduct(false);
    }
  };

  const getProductsAll = async () => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
    );
    console.log(res);
    setProducts(res.data.products);
  };

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

  if (isLoadingProduct) {
    return (
      <main className="product container mb-6">
        <FullPageLoader />;
      </main>
    );
  }

  return (
    <>
      <Message type={messageType} message={message} />
      <main className="product container mb-6">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link
                to={`/products?category=${encodeURIComponent(
                  product.category
                )}`}
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
              <div className="row flex-column-reverse flex-md-row">
                <div
                  className={`${
                    product?.imagesUrl?.length > 1
                      ? 'col-12 col-md-2'
                      : 'd-none'
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
                    className="btn btn-dark position-absolute top-0 end-0 m-2 rounded-circle opacity-75"
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
            <ul className="nav nav-tabs" id="myTab" role="tablist">
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
                  <h5 className="text-start text-md-center">
                    Care Instructions
                  </h5>
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
                  className="mt-4 mt-md-5 ps-2 product-content"
                  dangerouslySetInnerHTML={{
                    __html: product.content?.info,
                  }}
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
                  className="mt-4 mt-md-5 ps-2 product-content"
                  dangerouslySetInnerHTML={{
                    __html: product.content?.size,
                  }}
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
                  className="mt-4 mt-md-5 ps-2 product-content"
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
          {/* TODO: cart icon 元件化 */}
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
                {cart.carts?.reduce(
                  (total, cartItem) => total + cartItem.qty,
                  0
                )}
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
        {/* mobile end */}

        {recentlySeenProducts.length !== 0 && (
          // FIXME: FIXED? 資料沒有及時更新
          <section className="section-seen pt-2">
            <h2 className="fs-5 fw-bold border-bottom border-3 border-black d-inline px-1 py-1">
              Recently Seen
            </h2>
            <div className="mt-5">
              <Swiper
                modules={[Navigation, Pagination, EffectFade, Scrollbar]}
                spaceBetween={24} // space between slides
                slidesPerView={1} // number of products per slide
                navigation // enable navigation buttons
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true, hide: true }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                breakpoints={{
                  320: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  992: {
                    slidesPerView: 4,
                  },
                  1200: {
                    slidesPerView: 5,
                  },
                }}
              >
                {recentlySeenProducts.slice(0, 10).map((item) => (
                  <SwiperSlide key={item.id} className="mb-5">
                    <ProductCard2 product={item} hasFooter={false} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>
        )}
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
          @media (min-width: 1200px) {
            .swiper-wrapper {
              width: 1200px;
            }
          }
        `}
        </style>

        {products.some(
          (item) => item.category === product.category && item.id !== id
        ) && (
          <section className="section-related pt-2">
            <h2 className="fs-5 fw-bold border-bottom border-3 border-black d-inline px-1 py-1">
              You might also need...
            </h2>
            <div className="mt-5">
              <Swiper
                modules={[Navigation, Pagination, EffectFade, Scrollbar]}
                spaceBetween={24} // space between slides
                slidesPerView={5} // number of products per slide
                navigation // enable navigation buttons
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true, hide: true }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                breakpoints={{
                  320: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  992: {
                    slidesPerView: 4,
                  },
                  1200: {
                    slidesPerView: 5,
                  },
                }}
              >
                {products
                  .filter(
                    (item) =>
                      item.category === product.category && item.id !== id
                  )
                  .map((item) => (
                    <SwiperSlide key={item.id} className="mb-5">
                      <ProductCard2 product={item} hasFooter={false} />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default Product;
