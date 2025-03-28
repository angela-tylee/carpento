import { useState, useContext } from 'react';
import { NavLink, Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import ReactInputMask from "react-input-mask";
import axios from 'axios';
import { CartContext } from '../../context/CartContext';
import FullPageLoader from '../../components/FullPageLoader';

const Checkout = () => {
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  const { cart, getCart, isLoadingCart } = useContext(CartContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      streetAddress: '',
      city: '',
      country: '',
      county: '',
      postCode: '',
      phone: '',
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

    setIsLoading(true);

    try {
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/order`,
        order
      );

      if (res.data.orderId) {
        await axios.post(
          `/v2/api/${process.env.REACT_APP_API_PATH}/pay/${res.data.orderId}`
        );
      }

      setIsLoading(false);
      getCart();

      navigate(`/checkout-success/${res.data.orderId}`);
    } catch (error) {
      setIsLoading(false);
    }
  };

  if (isLoadingCart) {
    return (
    <main className="container mb-7 checkout">
      <FullPageLoader />
    </main>
    )
  }

  return (
    <main className="container mb-7 checkout">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-xl-8 d-none d-sm-block">
          <nav className="stepper mt-6 mb-5 d-flex justify-content-between">
            <div className="d-flex align-items-center bg-light pe-1 pe-md-2">
              <NavLink to='/cart'>
                <div className="step-number bg-secondary text-dark text-center pt-1 pointer">
                  1
                </div>
              </NavLink>
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
          <form
            className="col-12 col-lg-7 col-xl-8"
            action=""
            onSubmit={handleSubmit(onSubmit)}
          >
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
                inputMode="numeric"
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
                  pattern: {
                    value: /^\+?[0-9 ]+$/,
                    message: 'Please enter valid phone number',
                  },
                })}
              />
              {errors.phone && (
                <div className="invalid-feedback">{errors?.phone?.message}</div>
              )}
            </div>

            <h2 className="fs-4 mt-4 mb-3">Payment</h2>
            <div className="mb-2">
              <label htmlFor="cardInfo" className="form-label w-100 d-flex justify-content-between align-items-end">
                <p>Card Info<span className="text-danger">*</span></p>
                <div className="d-flex justify-content-end">
                  <img src={`${process.env.PUBLIC_URL}/images/credit-cards/visa.png`} alt="visa-card" className="credit-card" width="40px"/>
                  <img src={`${process.env.PUBLIC_URL}/images/credit-cards/master.png`} alt="master-card" className="credit-card" width="40px"/>
                  <img src={`${process.env.PUBLIC_URL}/images/credit-cards/american-express.png`} alt="american-express-card" className="credit-card" width="40px"/>
                </div>
              </label>
              <ReactInputMask
                type="text"
                className={`form-control ${errors.cardInfo && 'is-invalid'}`}
                id="cardInfo"
                inputMode="numeric"
                placeholder="1234 5678 9012 3456"
                autoComplete="cc-number"
                mask="9999 9999 9999 9999"
                maskChar="●"
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
                <ReactInputMask
                  type="text"
                  className={`form-control ${
                    errors.expiryDate && 'is-invalid'
                  }`}
                  id="expiryDate"
                  inputMode="numeric"
                  placeholder="MM/YY"
                  mask="99/99"
                  maskChar=""
                  {...register('expiryDate', {
                    required: {
                      value: true,
                      message: 'Card expiry date is required',
                    },
                    validate: (value) => {
                      const [month, year] = value.split('/').map(Number);
                      const currentYear = new Date().getFullYear() % 100;
                
                      if (isNaN(month) || isNaN(year)) {
                        return 'Invalid date format';
                      }
                      if (month < 1 || month > 12) {
                        return 'Please enter valid month';
                      }
                      if (year < currentYear || year > 99) {
                        return `Your card is expired`;
                      }
                      return true;
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
                <ReactInputMask
                  type="text"
                  className={`form-control ${errors.cvv && 'is-invalid'}`}
                  id="cvv"
                  placeholder="CVV"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  mask="999"
                  maskChar=""
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
              disabled={isLoading}
            >
              <div className="d-flex align-items-center justify-content-center">
                <div
                  className={`spinner-border spinner-border-sm text-light opacity-50 me-1 ${
                    isLoading ? '' : 'd-none'
                  }
                      `}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
                <span>Place Order</span>
              </div>
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
                  Cart (<span>{cart.carts?.reduce((total, cartItem) => total + cartItem.qty, 0)}</span> items)
                </h6>

                <div className="border-top border-bottom border-1 border-gray">
                  {cart.carts &&
                    cart.carts.map((cartItem) => (
                      <div className="row py-1" key={cartItem.product.id}>
                        <div className="d-none d-sm-block col-sm-2 col-lg-3">
                          <img
                            src={cartItem.product.imagesUrl[0]}
                            alt={cartItem.product.title}
                            width="100%"
                          />
                        </div>
                        <div className="col-8 col-sm-8 col-lg-6 py-1">
                          <h6>{cartItem.product.title}</h6>
                          <p>
                            QTY: <span>{cartItem.qty}</span>
                          </p>
                        </div>
                        <div className="col-4 col-sm-2 col-lg-3 py-1 text-end d-flex flex-column justify-content-end">
                          <p>${cartItem.total?.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="row pt-2 pb-1">
                  <h6 className="col-6">Subtotal</h6>
                  <p className="col-6 text-end">${cart.total?.toLocaleString()}</p>
                </div>

                <div className="row py-1">
                  <div className="col-9 d-flex align-items-center">
                    <h6>Discount</h6>
                    {cart.carts && cart.carts[0]?.coupon && (
                      <span className="badge rounded-pill px-1 bg-primary-subtle text-dark fw-normal ms-1">
                        {cart.carts[0].coupon.code || ''}
                      </span>
                    )}
                  </div>
                  <p className="col-3 text-end">
                    ${(cart.final_total - cart.total)?.toLocaleString()}
                  </p>
                </div>

                <div className="row pt-2">
                  <h6 className="col-6 fs-5">Total</h6>
                  <p className="col-6 text-end">${cart.final_total?.toLocaleString()}</p>
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
