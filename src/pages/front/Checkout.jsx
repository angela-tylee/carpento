import { Link } from 'react-router-dom';

const Checkout = () => {
  return (
    <main className="container mb-7">
      <div className="row justify-content-center">
        <div className="col-8">
          <nav className="stepper mt-6 mb-5 d-flex justify-content-between">
            <div className="d-flex align-items-center bg-light px-2">
              <div className="step-number bg-secondary text-dark text-center pt-1">1</div>
              <p className="ms-1 text-uppercase">Order Detail</p>
            </div>
            <div className="d-flex align-items-center bg-light px-2">
              <div className="step-number bg-dark text-secondary text-center pt-1">2</div>
              <p className="ms-1 text-uppercase">Shipping & Payment</p>
            </div>
            <div className="d-flex align-items-center bg-light px-2">
              <div className="step-number bg-secondary text-dark text-center pt-1">3</div>
              <p className="ms-1 text-uppercase">Order Confirm</p>
            </div>
          </nav>
        </div>
      </div>

      <section>
        <div className="row">
          <form className="col-8">
            <h2 className="fs-4 mt-4 mb-3">Email Address</h2>
            <div className="mb-2">
              <label htmlFor="email" className="form-label">
                Email address<span className="text-danger">*</span>
              </label>
              <input type="email" className="form-control" id="email" />
            </div>

            <h2 className="fs-4 mt-4 mb-3">Delivery Address</h2>
            <div className="row mb-2">
              <div className="col-6">
                <label htmlFor="firstName" className="form-label">
                  First Name<span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" id="firstName" />
              </div>
              <div className="col-6">
                <label htmlFor="lastName" className="form-label">
                  Last Name<span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" id="lastName" />
              </div>
            </div>

            <div className="mb-2">
              <label htmlFor="streetAddress" className="form-label">
                Street address<span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" id="streetAddress" />
            </div>

            <div className="row mb-2">
              <div className="col-6">
                <label htmlFor="city" className="form-label">
                  City<span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" id="city" />
              </div>
              <div className="col-6">
                <label htmlFor="country" className="form-label">
                  Country<span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" id="country" />
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-6">
                <label htmlFor="county" className="form-label">
                  County
                </label>
                <input type="text" className="form-control" id="county" />
              </div>
              <div className="col-6">
                <label htmlFor="postCode" className="form-label">
                  Post Code<span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" id="postCode" />
              </div>
            </div>

            <div className="mb-2">
              <label htmlFor="phone" className="form-label">
                Phone Number<span className="text-danger">*</span>
              </label>
              <input type="tel" className="form-control" id="phone" />
            </div>

            <h2 className="fs-4 mt-4 mb-3">Payment</h2>
            <div className="mb-2">
              <label htmlFor="cardInfo" className="form-label">
                Card Info<span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" id="cardInfo" placeholder="Card number" />
            </div>

            <div className="row mb-2">
              <div className="col-6">
                <input type="text" className="form-control" placeholder="MM/YY" />
              </div>
              <div className="col-6">
                <input type="text" className="form-control" placeholder="CVV" />
              </div>
            </div>

            <div className="mb-2">
              <label htmlFor="cardholderName" className="form-label">
                Cardholder Name
              </label>
              <input type="text" className="form-control" id="cardholderName" />
            </div>

            <button type="submit" className="mt-5 btn btn-primary text-uppercase fs-5 fw-normal w-100">
              Place Order
            </button>
          </form>

          <div className="col-4">
            <div className="bg-secondary p-3">
              <div className="d-flex justify-content-between pb-1 mb-2 border-bottom border-1 border-gray">
                <h5>Order Summary</h5>
                <Link to="/cart" className="text-decoration-underline">Edit</Link>
              </div>

              <div>
                <h6 className="mt-2 mb-1 fw-normal">
                  Cart (<span>3</span> items)
                </h6>

                <div className="border-top border-bottom border-1 border-gray">
                  <div className="row py-1">
                    <div className="col-3">
                      <img src="/assets/images/products/dining/mug-1.jpeg" alt="Mug" width="100%" />
                    </div>
                    <div className="col-6 py-1">
                      <h6>Card Title</h6>
                      <p>
                        QTY: <span>1</span>
                      </p>
                    </div>
                    <div className="col-3 py-1 text-end d-flex flex-column justify-content-end">
                      <p>$1,500</p>
                    </div>
                  </div>

                  <div className="row py-1">
                    <div className="col-3">
                      <img src="/assets/images/products/living-room/cushion-3.jpeg" alt="Cushion" width="100%" />
                    </div>
                    <div className="col-6 py-1">
                      <h6>Card Title</h6>
                      <p>
                        QTY: <span>1</span>
                      </p>
                    </div>
                    <div className="col-3 py-1 text-end d-flex flex-column justify-content-end">
                      <p>$1,500</p>
                    </div>
                  </div>

                  <div className="row py-1">
                    <div className="col-3">
                      <img src="/assets/images/products/workspace/desk-lamp-3.jpeg" alt="Desk Lamp" width="100%" />
                    </div>
                    <div className="col-6 py-1">
                      <h6>Card Title</h6>
                      <p>
                        QTY: <span>1</span>
                      </p>
                    </div>
                    <div className="col-3 py-1 text-end d-flex flex-column justify-content-end">
                      <p>$1,500</p>
                    </div>
                  </div>
                </div>

                <div className="row pt-2 pb-1">
                  <h6 className="col-6">Subtotal</h6>
                  <p className="col-6 text-end">$4,500</p>
                </div>

                <div className="row py-1">
                  <div className="col-8 d-flex align-items-center">
                    <h6>Promo Code</h6>
                    <span className="badge rounded-pill px-1 bg-primary-subtle text-dark fw-normal ms-1">
                      discount
                    </span>
                  </div>
                  <p className="col-4 text-end">-$40</p>
                </div>

                <div className="row pt-2">
                  <h6 className="col-6 fs-5">Total</h6>
                  <p className="col-6 text-end">$4,500</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Checkout;
