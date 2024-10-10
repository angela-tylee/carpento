import { Link } from 'react-router-dom';

const Product = () => {
  return (
    <main className="container mb-6">
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
                    src="../assets/images/products/decoration/fake-plant-3.jpeg"
                    className="w-100"
                    alt="Fake Plant 3"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-6">
            <h1 className="fs-2">Product Title</h1>
            <p className="fs-5 mt-1">$1,500</p>
            <p className="mt-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab minima, dolor a placeat aliquam facilis exercitationem tenetur, accusantium reiciendis, laudantium unde! Saepe dicta maxime sapiente repellendus, fugit adipisci assumenda officiis.
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, recusandae autem mollitia numquam molestiae repellat? Ipsum nulla, veniam necessitatibus unde molestias sed officiis enim tempore veritatis praesentium? Voluptatibus atque dolores alias asperiores facere voluptates nemo, totam sequi voluptatem iure impedit?
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
