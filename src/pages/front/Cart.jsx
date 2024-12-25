import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [coupon, setCoupon] = useState({
    code: '',
    success: null,
  });

  const getCart = async () => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/cart`
    );
    console.log(res.data.data);
    setCart(res.data.data);
  };

  const updateQty = async (cartItem, newQty) => {
    setIsLoading(true);
    try {
      await axios.put(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${cartItem.id}`,
        {
          data: {
            product_id: cartItem.product_id,
            qty: newQty,
          },
        }
      );
      setIsLoading(false);
      getCart();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, [coupon.success]);

  // const handleChange = (e) => {
  //   setCoupon(e.target.value);
  // }

  const applyCoupon = async () => {
    // setIsLoading(true);
    try {
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/coupon`,
        {
          data: {
            code: coupon.code,
          },
        }
      );
      console.log(res);
      coupon.success = res.data.success;

      // setIsLoading(false);
      getCart();
    } catch (error) {
      console.log(error);
      coupon.success = false;
      // setIsLoading(false);
    }
  };

  return (
    <main className="container mb-7">
      <div className="row justify-content-center">
        <div className="col-8">
          <nav className="stepper mt-6 mb-5 d-flex justify-content-between">
            <div className="d-flex align-items-center bg-light px-2">
              <div className="step-number bg-dark text-secondary text-center pt-1">
                1
              </div>
              <p className="ms-1 text-uppercase">Order Detail</p>
            </div>
            <div className="d-flex align-items-center bg-light px-2">
              <div className="step-number bg-secondary text-dark text-center pt-1">
                2
              </div>
              <p className="ms-1 text-uppercase">Shipping & Payment</p>
            </div>
            <div className="d-flex align-items-center bg-light px-2">
              <div className="step-number bg-secondary text-dark text-center pt-1">
                3
              </div>
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
              {/* QUESTION: cart.carts is sometimes undefined, leading to `TypeError: .map() is not a function`. But adding `cart.carts &&` resolves it. Why? Why is the time lag of undefined value?*/}
              {cart.carts &&
                cart.carts.map((cartItem) => (
                  <div
                    className="py-3 border-top border-2 border-secondary"
                    key={cartItem.id}
                  >
                    <div className="row">
                      <div className="col-2">
                        <img
                          src={cartItem.product.imageUrl}
                          alt={cartItem.product.title}
                          style={{ width: '100%' }}
                        />
                      </div>
                      <div className="col-8 py-1 d-flex flex-column justify-content-between">
                        <h6>{cartItem.product.title}</h6>
                        <div className="input-group w-50">
                          <button
                            className="btn btn-outline-secondary text-dark"
                            type="button"
                            id="button-addon1"
                            onClick={() =>
                              updateQty(cartItem, cartItem.qty - 1)
                            }
                            disabled={isLoading || cartItem.qty === 1}
                          >
                            <i className="bi bi-dash"></i>
                          </button>
                          <input
                            type="text"
                            className="form-control text-center"
                            aria-label="Example text with button addon"
                            aria-describedby="button-addon1"
                            value={cartItem.qty}
                            readOnly
                          />
                          <button
                            className="btn btn-outline-secondary text-dark"
                            type="button"
                            id="button-addon1"
                            onClick={() =>
                              updateQty(cartItem, cartItem.qty + 1)
                            }
                            disabled={isLoading}
                          >
                            <i className="bi bi-plus"></i>
                          </button>
                        </div>
                      </div>
                      <div className="col-2 py-1 text-end d-flex flex-column justify-content-between">
                        <i className="bi bi-x-lg"></i>
                        <p>${cartItem.total.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="col-4">
              <div className="bg-secondary p-3">
                <h5 className="pb-1 mb-1 border-bottom border-1 border-gray">Order Summary</h5>
                <div className="row py-1">
                  <h6 className="col-6">Subtotal</h6>
                  <p className="col-6 text-end">
                    ${cart.total?.toLocaleString()}
                  </p>
                </div>
                <div className="row py-1">
                  <h6 className="col-6">Discount</h6>
                  <p className="col-6 text-end">
                    ${(cart.final_total - cart.total)?.toLocaleString()}
                  </p>
                </div>
                <div className="row py-1">
                  <h6 className="col-12 mb-1">Promo Code</h6>
                  <div className="input-group">
                    <input
                      type="text"
                      className={`form-control ${coupon.success === null ? '' : 
                        (coupon.success ? 'is-valid' : 'is-invalid')
                      }`}
                      aria-label="Example text with button addon"
                      aria-describedby="button-addon1"
                      value={coupon.code}
                      // onChange={handleChange}
                      name="code"
                      onChange={(e) => {
                        setCoupon({
                          ...coupon,
                          code: e.target.value});
                        console.log(coupon.code, coupon.success);
                      }}
                    />
                    <button
                      className="btn btn-outline-dark"
                      type="button"
                      id="button-addon1"
                      onClick={applyCoupon}
                      disabled={isLoading}
                    >
                      Apply
                    </button>
                    <div class="valid-feedback">coupon applied!</div>
                    {/* FIXME: feedback not showing immediately. */}
                    <div class="invalid-feedback">cannot find this coupon!</div>
                  </div>
                </div>
                <div className="row py-1 border-top border-1 border-gray">
                  <h6 className="col-6">Total</h6>
                  <p className="col-6 text-end">
                    ${cart.final_total?.toLocaleString()}
                  </p>
                </div>
                <div className="row mt-3">
                  <div className="col-12">
                    <Link
                      to="/checkout"
                      className="btn btn-dark text-uppercase w-100"
                    >
                      Proceed to Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Cart;
