import { Link } from 'react-router-dom';

const Cart = () => {
  return (
    <main className="container mb-7">
      <div className="row justify-content-center">
        <div className="col-8">
          <nav className="stepper mt-6 mb-5 d-flex justify-content-between">
            <div className="d-flex align-items-center bg-white px-2">
              <div className="step-number bg-black text-secondary text-center pt-1">1</div>
              <p className="ms-1 text-uppercase">Order Detail</p>
            </div>
            <div className="d-flex align-items-center bg-white px-2">
              <div className="step-number bg-secondary text-dark text-center pt-1">2</div>
              <p className="ms-1 text-uppercase">Shipping & Payment</p>
            </div>
            <div className="d-flex align-items-center bg-white px-2">
              <div className="step-number bg-secondary text-dark text-center pt-1">3</div>
              <p className="ms-1 text-uppercase">Order Confirm</p>
            </div>
          </nav>
        </div>
      </div>

      <section className="row justify-content-center">
        <div className="col-10">
          <h1 className="fs-4 mb-4">Cart</h1>
          <div className="row">
            <div className="col-8 pe-4">
              <div className="py-3 border-top border-2 border-secondary">
                <div className="row">
                  <div className="col-2">
                    <img src="../assets/images/products/dining/mug-1.jpeg" alt="..." style={{ width: "100%" }} />
                  </div>
                  <div className="col-8 py-1 d-flex flex-column justify-content-between">
                    <h6>Card Title</h6>
                    <div className="input-group w-25">
                      <button className="btn btn-outline-secondary text-dark" type="button" id="button-addon1">-</button>
                      <input type="text" className="form-control text-center" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                      <button className="btn btn-outline-secondary text-dark" type="button" id="button-addon1">+</button>
                    </div>
                  </div>
                  <div className="col-2 py-1 text-end d-flex flex-column justify-content-between">
                    <i className="bi bi-x-lg"></i>
                    <p>$1,500</p>
                  </div>
                </div>
              </div>

              <div className="py-3 border-top border-2 border-secondary">
                <div className="row">
                  <div className="col-2">
                    <img src="../assets/images/products/living-room/cushion-3.jpeg" alt="..." style={{ width: "100%" }} />
                  </div>
                  <div className="col-8 py-1 d-flex flex-column justify-content-between">
                    <h6>Card Title</h6>
                    <div className="input-group w-25">
                      <button className="btn btn-outline-secondary text-dark" type="button" id="button-addon1">-</button>
                      <input type="text" className="form-control text-center" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                      <button className="btn btn-outline-secondary text-dark" type="button" id="button-addon1">+</button>
                    </div>
                  </div>
                  <div className="col-2 py-1 text-end d-flex flex-column justify-content-between">
                    <i className="bi bi-x-lg"></i>
                    <p>$1,500</p>
                  </div>
                </div>
              </div>

              <div className="py-3 border-top border-bottom border-2 border-secondary">
                <div className="row">
                  <div className="col-2">
                    <img src="../assets/images/products/workspace/desk-lamp-3.jpeg" alt="..." style={{ width: "100%" }} />
                  </div>
                  <div className="col-8 py-1 d-flex flex-column justify-content-between">
                    <h6>Card Title</h6>
                    <div className="input-group w-25">
                      <button className="btn btn-outline-secondary text-dark" type="button" id="button-addon1">-</button>
                      <input type="text" className="form-control text-center" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                      <button className="btn btn-outline-secondary text-dark" type="button" id="button-addon1">+</button>
                    </div>
                  </div>
                  <div className="col-2 py-1 text-end d-flex flex-column justify-content-between">
                    <i className="bi bi-x-lg"></i>
                    <p>$1,500</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="bg-secondary p-3">
                <h5 className="mb-2">Order Summary</h5>
                <div className="row py-1 border-top border-1 border-gray">
                  <h6 className="col-6">Subtotal</h6>
                  <p className="col-6 text-end">$1,500</p>
                </div>
                <div className="row py-1">
                  <h6 className="col-12 mb-1">Promo Code</h6>
                  <div className="input-group">
                    <input type="text" className="form-control" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                    <button className="btn btn-outline-dark" type="button" id="button-addon1">Apply</button>
                  </div>
                </div>
                <div className="row py-1 border-top border-1 border-gray">
                  <h6 className="col-6">Total</h6>
                  <p className="col-6 text-end">$1,500</p>
                </div>
                <div className="row mt-3">
                  <div className="col-12">
                    <Link to="/checkout" className="btn btn-dark text-white text-uppercase w-100">Proceed to Checkout</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Cart;