import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const [loginState, setLoginState] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post('/v2/admin/signin', data);
      const { token, expired } = res.data;
      document.cookie = `carpento=${token}; expires=${new Date(expired)}`;

      setIsLoading(false);

      if (res.data.success) {
        navigate('/admin/products');
      }
    } catch (error) {
      let loginMessage = '登入失敗';

      if (error.response.data.error.code === 'auth/wrong-password') {
        loginMessage = '帳號或密碼錯誤';
      } else if (error.response.data.error.code === 'auth/invalid-email') {
        loginMessage = '請輸入正確的 email';
      }

      setLoginState(loginMessage);

      setIsLoading(false);
    }
  };

  return (
    <>
    <div className="vh-100">
      <div className="row h-100 g-0">
        <div
          className="col-md-7"
          style={{
            background: `center/cover no-repeat url(${process.env.PUBLIC_URL}/images/banner-9.jpeg)`,
          }}
        ></div>
        <div className="col-md-5">
          <div className="px-5 d-flex h-100 flex-column justify-content-center">
            <h2 className="mb-4 text-center">Dashboard | Sign in</h2>
            <div
              className={`alert alert-danger ${
                loginState ? 'd-block' : 'd-none'
              }`}
              role="alert"
            >
              {loginState}
            </div>
            <form onSubmit={submit}>
              <label
                htmlFor="email"
                className="form-label w-100 text-uppercase mb-2"
              >
                Email
                <input
                  id="email"
                  className="form-control"
                  name="username"
                  type="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                />
              </label>
              <label
                htmlFor="password"
                className="form-label w-100 text-uppercase mb-2"
              >
                Password
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  placeholder="name@example.com"
                  onChange={handleChange}
                />
              </label>
              <button
                className="btn btn-primary w-100 text-uppercase text-light mt-2"
                onClick={submit}
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
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
