import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  const getCart = async () => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/cart`
    );
    console.log(res.data.data);
    setCart(res.data.data);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: 'example@abc.com',
      firstName: 'John',
      lastName: 'Doe',
      streetAddress: '123 Main St',
      city: 'New York',
      country: 'USA',
      county: 'New York',
      postCode: '10001',
      phone: '123-456-7890',
    },
    mode: 'onTouched',
  });

  const onSubmit = async (data) => {
    const order = {
      data: {
        user: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          tel: data.phone,
          address: `${data.streetAddress}, ${data.city}, ${data.county}, ${data.country} ${data.postCode}`,
        },
        message: '',
      },
    };
    console.log(order);

    try {
      // TODO: 清空表單、跳轉至 checkout-success
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/order`,
        order
      );
      console.log(res);

      if (res.data.orderId) {
        const paymentRes = await axios.post(
          `/v2/api/${process.env.REACT_APP_API_PATH}/pay/${res.data.orderId}`,
          // FIXME: 日期錯誤 1970
          // {
          //   ...order,
          //   create_at: Date.now(),
          // }
        );
        console.log(paymentRes);
      }

      navigate(`/checkout-success/${res.data.orderId}`);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(watch());
  // console.log('errors:', errors);

  // const getOrders = async () => {
  //   const res = await axios.get(
  //     `/v2/api/${process.env.REACT_APP_API_PATH}/orders`
  //   );
  //   console.log("order",res);
  // };

  useEffect(() => {
    getCart();
    // getOrders();
  }, []);

  return (
    <main className="container mb-7">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-xl-8 d-none d-sm-block">
          <nav className="stepper mt-6 mb-5 d-flex justify-content-between">
            <div className="d-flex align-items-center bg-light pe-1 pe-md-2">
              <div className="step-number bg-secondary text-dark text-center pt-1">
                1
              </div>
              <p className="ms-1 text-uppercase">Order Detail</p>
            </div>
            <div className="d-flex align-items-center bg-light px-1 px-md-2">
              <div className="step-number bg-dark text-secondary text-center pt-1">
                2
              </div>
              <p className="ms-1 text-uppercase">Shipping & Payment</p>
            </div>
            <div className="d-flex align-items-center bg-light ps-1 pe-0 px-md-2">
              <div className="step-number bg-secondary text-dark text-center pt-1">
                3
              </div>
              <p className="ms-1 text-uppercase">Order Confirm</p>
            </div>
          </nav>
        </div>
      </div>

      <section>
        <div className="row">
          <form className="col-12 col-lg-7 col-xl-8" action="" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="fs-4 mt-4 mb-3">Email Address</h2>
            <div className="mb-2">
              <label htmlFor="email" className="form-label">
                Email address<span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className={`form-control ${errors.email && 'is-invalid'}`}
                id="email"
                {...register('email', {
                  required: {
                    value: true,
                    message: 'Email is required',
                  },
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors?.email?.message}</div>
              )}
            </div>

            <h2 className="fs-4 mt-4 mb-3">Delivery Address</h2>
            <div className="row mb-2">
              <div className="col-6">
                <label htmlFor="firstName" className="form-label">
                  First Name<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.firstName && 'is-invalid'}`}
                  id="firstName"
                  {...register('firstName', {
                    required: {
                      value: true,
                      message: 'First name is required',
                    },
                  })}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">
                    {errors?.firstName?.message}
                  </div>
                )}
              </div>
              <div className="col-6">
                <label htmlFor="lastName" className="form-label">
                  Last Name<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.lastName && 'is-invalid'}`}
                  id="lastName"
                  {...register('lastName', {
                    required: {
                      value: true,
                      message: 'Last name is required',
                    },
                  })}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">
                    {errors?.lastName?.message}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-2">
              <label htmlFor="streetAddress" className="form-label">
                Street address<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.streetAddress && 'is-invalid'
                }`}
                id="streetAddress"
                {...register('streetAddress', {
                  required: {
                    value: true,
                    message: 'Street address is required',
                  },
                })}
              />
              {errors.streetAddress && (
                <div className="invalid-feedback">
                  {errors?.streetAddress?.message}
                </div>
              )}
            </div>

            <div className="row mb-2">
              <div className="col-6">
                <label htmlFor="city" className="form-label">
                  City<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.city && 'is-invalid'}`}
                  id="city"
                  {...register('city', {
                    required: {
                      value: true,
                      message: 'City is required',
                    },
                  })}
                />
                {errors.city && (
                  <div className="invalid-feedback">
                    {errors?.city?.message}
                  </div>
                )}
              </div>
              <div className="col-6">
                <label htmlFor="country" className="form-label">
                  Country<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.country && 'is-invalid'}`}
                  id="country"
                  {...register('country', {
                    required: {
                      value: true,
                      message: 'Country is required',
                    },
                  })}
                />
                {errors.country && (
                  <div className="invalid-feedback">
                    {errors?.country?.message}
                  </div>
                )}
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-6">
                <label htmlFor="county" className="form-label">
                  County / State / Province
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="county"
                  {...register('county')}
                />
              </div>
              <div className="col-6">
                <label htmlFor="postCode" className="form-label">
                  Post Code<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.postCode && 'is-invalid'}`}
                  maxLength="6"
                  id="postCode"
                  {...register('postCode', {
                    required: {
                      value: true,
                      message: 'Post code is required',
                    },
                  })}
                />
                {errors.postCode && (
                  <div className="invalid-feedback">
                    {errors?.postCode?.message}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-2">
              <label htmlFor="phone" className="form-label">
                Phone Number<span className="text-danger">*</span>
              </label>
              <input
                type="tel"
                className={`form-control ${errors.phone && 'is-invalid'}`}
                id="phone"
                {...register('phone', {
                  required: {
                    value: true,
                    message: 'Phone number is required',
                  },
                  minLength: {
                    value: 6,
                    message: 'Phone number must be at least 6 digits',
                  },
                  maxLength: {
                    value: 12,
                    message: 'Phone number cannot be longer than 12 digits',
                  },
                })}
              />
              {errors.phone && (
                <div className="invalid-feedback">{errors?.phone?.message}</div>
              )}
            </div>

            <h2 className="fs-4 mt-4 mb-3">Payment</h2>
            <div className="mb-2">
              {/* TODO: Validate Card Info */}
              <label htmlFor="cardInfo" className="form-label">
                Card Info<span className="text-danger">*</span>
              </label>
              {/* TODO: Add Cards icon */}
              <input
                type="text"
                className={`form-control ${errors.cardInfo && 'is-invalid'}`}
                id="cardInfo"
                inputmode="numeric"
                pattern="\d{13,19}"
                placeholder="1234 5678 9012 3456"
                autocomplete="cc-number"
                maxLength="19"
                {...register('cardInfo', {
                  required: {
                    value: true,
                    message: 'Card number is required',
                  },
                  minLength: {
                    value: 12,
                    message: 'Card number must be at least 12 digits',
                  },
                  maxLength: {
                    value: 19,
                    message: 'Card number cannot be longer than 19 digits',
                  },
                })}
              />
              {errors.cardInfo && (
                <div className="invalid-feedback">
                  {errors?.cardInfo?.message}
                </div>
              )}
            </div>

            <div className="row mb-2">
              <div className="col-6">
                <label htmlFor="expiryDate" className="d-none"></label>
                <input
                  type="text"
                  id="expiryDate"
                  className={`form-control ${errors.expiryDate && 'is-invalid'}`}
                  placeholder="MM/YY"
                  {...register('expiryDate', {
                    required: {
                      value: true,
                      message: 'Card expiry date is required',
                    },
                  })}
                />
                {errors.expiryDate && (
                  <div className="invalid-feedback">
                    {errors?.expiryDate?.message}
                  </div>
                )}
              </div>
              <div className="col-6">
                <label htmlFor="cvv" className="d-none"></label>
                <input
                  type="text"
                  className={`form-control ${errors.cvv && 'is-invalid'}`}
                  placeholder="CVV"
                  id="cvv"
                  name="cvv"
                  inputmode="numeric"
                  pattern="\d{3,4}"
                  autocomplete="cc-csc"
                  maxLength="4"
                  {...register('cvv', {
                    required: {
                      value: true,
                      message: 'CVV is required',
                    },
                    maxLength: {
                      value: 4,
                      message: 'CVV cannot be longer than 4 digits',
                    },
                  })}
                />
                {errors.cvv && (
                  <div className="invalid-feedback">{errors?.cvv?.message}</div>
                )}
              </div>
            </div>

            <div className="mb-2">
              <label htmlFor="cardholderName" className="form-label">
                Cardholder Name
              </label>
              <input type="text" className="form-control" id="cardholderName" />
            </div>

            <button
              type="submit"
              className="mt-5 btn btn-primary text-uppercase fs-5 fw-normal w-100"
            >
              Place Order
            </button>
          </form>

          <div className="col-12 col-lg-5 col-xl-4 mt-4 mt-lg-0">
            <div className="bg-secondary p-3">
              <div className="d-flex justify-content-between pb-1 mb-2 border-bottom border-1 border-gray">
                <h5>Order Summary</h5>
                <Link to="/cart" className="text-decoration-underline">
                  Edit
                </Link>
              </div>

              <div>
                <h6 className="mt-3 mb-1 fw-normal">
                  Cart (<span>{cart.carts?.length}</span> items)
                </h6>

                <div className="border-top border-bottom border-1 border-gray">
                  {cart.carts &&
                    cart.carts.map((cartItem) => (
                      <div className="row py-1">
                        <div className="d-none d-md-block col-md-2 col-lg-3">
                          <img
                            src={cartItem.product.imageUrl}
                            alt={cartItem.product.title}
                            width="100%"
                          />
                        </div>
                        <div className="col-9 col-md-7 col-lg-6 py-1">
                          <h6>{cartItem.product.title}</h6>
                          <p>
                            QTY: <span>{cartItem.qty}</span>
                          </p>
                        </div>
                        <div className="col-3 py-1 text-end d-flex flex-column justify-content-end">
                          <p>${cartItem.total}</p>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="row pt-2 pb-1">
                  <h6 className="col-6">Subtotal</h6>
                  <p className="col-6 text-end">${cart.total}</p>
                </div>

                <div className="row py-1">
                  <div className="col-9 d-flex align-items-center">
                    {/* TODO: add discount */}
                    <h6>Promo Code</h6>
                    <span className="badge rounded-pill px-1 bg-primary-subtle text-dark fw-normal ms-1">
                    {/* {(cart.carts && cart.carts[0].coupon.code) || ''} */}
                    <i className="bi bi-x"></i>
                    </span>
                  </div>
                  <p className="col-3 text-end">${cart.final_total - cart.total}</p>
                </div>

                <div className="row pt-2">
                  <h6 className="col-6 fs-5">Total</h6>
                  <p className="col-6 text-end">${cart.final_total}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Checkout;
