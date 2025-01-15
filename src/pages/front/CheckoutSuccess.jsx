import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import FullPageLoader from '../../components/FullPageLoader';

const CheckoutSuccess = () => {
  const [order, setOrder] = useState([]);
  const { id } = useParams();
  const [isLoadingOrder, setIsLoadingOrder] = useState(false);

  const getOrders = async () => {
    setIsLoadingOrder(true);
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/order/${id}`
      );
      console.log('order', res.data);
      setOrder(res.data.order);
      setIsLoadingOrder(false);
    } catch (error) {
      console.log(error);
      setIsLoadingOrder(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  if (isLoadingOrder) {
    return (
      <main className="checkout-success container mb-7">
        <FullPageLoader />
      </main> 
    )
  }

  return (
    <main className="checkout-success container pb-7 mb-7 d-flex flex-column justify-content-center align-items-center h-100">
      <section className="text-center py-7">
        <h1 className="fs-2">
          <i className="bi bi-check-square-fill text-success me-1"></i>Your
          Purchase is Complete.
        </h1>
        <p className="mt-2">Thank you for purchasing from Carpento.</p>
        <div className="mt-4 d-flex checkout-success-btn-group">
          <Link to="/" className="btn btn-outline-dark w-100 me-2">
            Back to Home
          </Link>
          <Link to="/products" className="btn btn-dark w-100">
            Continue Shopping
          </Link>
        </div>
      </section>
      <hr />

      {order && order.id && (
        <section className="mt-4 col-12 col-md-10 col-xl-8">
          <div className="bg-secondary p-3">
            <div className="d-flex justify-content-between pb-1 mb-2 border-bottom border-1 border-gray">
              <h5>Order Summary</h5>
              <div className="d-flex align-items-center">
                <button
                  className="btn p-0 text-decoration-underline d-flex align-items-center"
                  // onClick={}
                >
                  {/* TODO: add copy link */}
                  <span>Copy link</span>
                  <i className="bi bi-link-45deg fs-5 ms-1"></i>
                </button>
                <span className="mx-1">or</span>
                <button
                  className="btn p-0"
                  onClick={() => window.print()}
                  title="print this page"
                >
                  <i className="bi bi-printer-fill fs-5"></i>
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6">
                <p className="card-text pt-1">Order Number: {order.id}</p>
                <p className="card-text pt-1">
                  Payment Status：{order.is_paid ? 'Paid' : 'Not paid yet'}
                </p>
                <p className="card-text pt-1">
                  Paid Date: {new Date(order.paid_date * 1000).toDateString()}
                </p>
                <p className="card-text pt-1">
                  Total: ${order.total.toLocaleString()}
                </p>
                <p className="card-text pt-1">
                  Quantity: {Object.values(order?.products)?.length}
                </p>
              </div>
            <div className="border-top border-1 border-gray my-1 d-block d-sm-none"></div>
              <div className="col-12 col-sm-6">
                <p className="card-text pt-1">Name：{order.user.name}</p>
                <p className="card-text pt-1">Email：{order.user.email}</p>
                <p className="card-text pt-1">Tel：{order.user.tel}</p>
                <p className="card-text pt-1">
                  Shipping Address：
                  <p className="pt-1">{order.user.address}</p>
                </p>
              </div>
            </div>
            <div>
              <h5 className="pb-1 mt-4 mb-2 border-bottom border-1 border-gray">
                Order Details
              </h5>
              <div className="border-bottom border-1 border-gray">
                {order.products &&
                  Object.values(order.products).map((item) => (
                    <div className="row py-1">
                      <div className="d-none d-sm-block col-sm-2">
                        <img
                          src={item.product.imagesUrl[0]}
                          alt={item.product.title}
                          width="100%"
                        />
                      </div>
                      <div className="col-8 col-sm-8 py-1">
                        <h6>{item.product.title}</h6>
                        <p>
                          QTY: <span>{item.qty}</span>
                        </p>
                      </div>
                      <div className="col-4 col-sm-2 py-1 text-end d-flex flex-column justify-content-end">
                        <del>${item.total.toLocaleString()}</del>
                        <span>${item.final_total.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
              </div>

              {/* <div className="row pt-2">
                <h6 className="col-6">Subtotal</h6>
                <p className="col-6 text-end">${order?.products[0]?.total}</p>
              </div> */}

              {Object.values(order.products)[0]?.coupon?.code ? (
                <div className="row pt-2 py-1">
                  <div className="col-12 d-flex align-items-center justify-content-between">
                    <h6>Promo Code</h6>
                    <span className="badge rounded-pill px-1 bg-primary-subtle text-dark fw-normal ms-1">
                      {Object.values(order.products)[0]?.coupon?.code}
                    </span>
                  </div>
                  {/* <p className="col-3 text-end">${cart.final_total - cart.total}</p> */}
                </div>
              ) : (
                ''
              )}

              <div className="row pt-2">
                <h6 className="col-6 fs-5">Total</h6>
                <p className="col-6 text-end">
                  ${order.total.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
      <p className="mt-4">
        Having any problems?{' '}
        <a
          href="mailto:support@carpento.com"
          className="text-decoration-underline"
        >
          Contact us
        </a>
      </p>
    </main>
  );
};

export default CheckoutSuccess;
