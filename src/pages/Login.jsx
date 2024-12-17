import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const [loginState, setLoginState] = useState({

  })

  function handleChange(e) {
    const { name, value } = e.target;
    // console.log(name, value);
    setData({ ...data, [name]: value });
  }

  // QUESTION: Cookie, useEffect 2024-12-10

  async function submit() {
    try {
      const res = await axios.post('/v2/admin/signin', data);
      const { token, expired } = res.data; // 取得 token
      console.log(res.data);
      document.cookie = `carpento=${token}; expires=${new Date(expired)}`; // 儲存 token 到 cookie
      console.log('submit');
  
      if (res.data.success) {
        navigate('/admin/products'); // 登入成功：畫面轉到 admin/products
      }
    } catch (error) {
      setLoginState(error.response.data); // 登入失敗
    }
  }

  // useEffect(() => {
  //   const token = document.cookie
  //     .split('; ')
  //     .find((row) => row.startsWith('carpento='))
  //     ?.split('=')[1];
  //   console.log(token);
  //   axios.defaults.headers.common['Authorization'] = token;
  //   (async () => {
  //     const productRes = await axios.get(
  //       `/v2/api/${process.env.REACT_APP_API_PATH}/admin/products/all`
  //     );
  //     console.log(productRes);
  //   })();
  // }, []);

  return (
    <div className="vh-100">
      <div className="row h-100">
        <div
          className="col-md-7"
          style={{
            background: 'center/cover no-repeat url(/images/banner-9.jpeg)',
          }}
        >
          {/* <img src="/images/banner-9.jpeg" width="100%" alt="" /> */}
        </div>
        <div className="col-md-5">
          <div className="px-5 d-flex h-100 flex-column justify-content-center">
            <h2 className="mb-4 text-center">Dashboard | Sign in</h2>
            <div className={`alert alert-danger ${loginState.message ? 'd-block' : 'd-none'}`} role="alert">
              {/* TODO: Custom Error Message: 請輸入帳號密碼 / 帳號或密碼錯誤 */}
              {loginState.message}
            </div>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="form-label w-100 text-uppercase"
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
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="form-label w-100 text-uppercase"
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
            </div>
            <button
              type="button"
              className="btn btn-primary w-100 text-uppercase text-white"
              onClick={submit}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
