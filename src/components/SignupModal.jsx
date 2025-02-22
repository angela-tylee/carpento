import { useState, useContext } from 'react';
// import Message from '../../components/Message';
import { MessageContext } from '../context/MessageContext';
import { useForm } from 'react-hook-form';

const SignupModal = () => {
  const { showMessage } = useContext(MessageContext);
  
  const [lightboxOpen, setLightboxOpen] = useState(true);
  // const [email, setEmail] = useState('');
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: '',
    },
    mode: 'onTouched',
  });

  function submitEmail() {
    setIsLoadingEmail(true);
    setTimeout(() => {
      setLightboxOpen(false);
      // setEmail('');
      reset();
      setIsLoadingEmail(false);
      showMessage('success', "We've received your Email!");
    }, 2000);
  }

  return (
    <>
      {lightboxOpen && (
        <div
          className="position-fixed top-0 start-0 bottom-0 end-0 bg-dark bg-opacity-25 d-flex align-items-center justify-content-center"
          style={{ zIndex: 1050 }}
        >
          <div className="position-relative col-10 col-md-8 col-xl-6 mx-3 shadow">
            <div className="bg-light p-4 p-md-6">
              <h2>
                <span className="pe-1">Join Us for Exclusive Deals!</span>
                <i className="bi bi-tags-fill"></i>
              </h2>
              <p className="mt-2 mt-md-4">Be the first to access:</p>
              <ul className="ps-2">
                <li className="mt-md-1">
                  Special discounts & early access to sales
                </li>
                <li className="mt-md-1">Exciting new product launches</li>
              </ul>
              <form
                className="input-group mt-2 mt-md-5 mb-1"
                onSubmit={handleSubmit(submitEmail)}
              >
                <input
                  type="col-8 col-md-10 email"
                  className={`form-control ${errors.email && 'is-invalid'}`}
                  id="email"
                  placeholder="Enter Your Email"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  aria-label="Enter your email"
                  aria-describedby="basic-addon2"
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
                <button
                  className="col-4 col-md-2 input-group-text justify-content-center"
                  id="basic-addon2"
                  disabled={isLoadingEmail || errors.email}
                >
                  <div
                    className={`spinner-border spinner-border-sm text-body opacity-50 me-1 ${
                      isLoadingEmail ? '' : 'd-none'
                    }`}
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  Enter
                </button>
                {errors.email && (
                  <p className="invalid-feedback">{errors?.email?.message}</p>
                )}
              </form>
              <small className="text-body-secondary">
                We respect your privacy. No spam, just great content.
              </small>
            </div>
            <button
              className="btn btn-transparent position-absolute top-0 end-0 m-1 m-md-2"
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
    </>
  );
};

export default SignupModal;