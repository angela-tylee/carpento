import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Product = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  const getProduct = async (id) => {
    const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`);
    console.log(res);
    setProduct(res.data.product);
  }
  
  useEffect(() => {
    // QUESTION: React Hook useEffect has a missing dependency...https://courses.hexschool.com/courses/react-video-course/lectures/45744008 07:00
    getProduct(id);
  },[id])
  
  return (
    <main className="container mb-6">
      {/* TODO: Separate breadcrumb component */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item">Living Room</li>
          <li className="breadcrumb-item active" aria-current="page">Product</li>
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
            <p className="fs-5 mt-1"><span className="text-primary">${product.price} </span><del> ${product.origin_price}</del></p>
            <p className="mt-2">
              {product.content}
            </p>

            <div className="mt-3 w-100 d-flex align-items-center">
              <div className="input-group w-25">
                <button className="btn btn-outline-secondary text-dark" type="button" id="button-addon1">-</button>
                <input type="text" className="form-control text-center" placeholder="" aria-label="Example text with button addon" />
                <button className="btn btn-outline-secondary text-dark" type="button" id="button-addon1">+</button>
              </div>
              <button type="button" className="btn btn-primary text-white w-25 ms-2">Add to Cart</button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-info pt-5 pb-6 border-bottom border-1 border-secondary">
        <div className="col-9">
          <h2 className="fs-5 fw-bold border-bottom border-3 border-black d-inline px-1 py-1">Info</h2>
          <p className="mt-5">
            {product.content}
          </p>
        </div>
      </section>

      <section className="section-related pt-2">
        <h2 className="fs-5 fw-bold border-bottom border-3 border-black d-inline px-1 py-1">Related Products</h2>
        <div className="mt-5">
          <div className="row">
            {Array(4).fill().map((_, index) => (
              <div className="col-3" key={index}>
                <div className="card w-100 border-0" style={{ width: '18rem' }}>
                  <img src="../assets/images/products/living-room/cabinet-3.jpeg" className="card-img-top" alt="Product" />
                  <div className="card-body p-0 mt-2">
                    <h5 className="card-title fs-6 fw-bold">Card title</h5>
                    <div className="card-text">
                      <span className="text-primary">$1,500</span>
                      <del>$2,000</del>
                    </div>
                    <div className="d-flex w-100 mt-2">
                      <input type="number" name="" id="" className="form-control w-25 text-center" />
                      <button type="button" className="btn btn-primary text-white ms-1 w-75">Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Product;
