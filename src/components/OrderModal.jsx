import { useState, useEffect } from 'react';
import axios from 'axios';

function OrderModal({
  closeOrderModal,
  getOrders,
  selectedOrder,
  openDeleteModal,
}) {
  // const [uploadImageUrl, setUploadImageUrl] = useState(null);
  const [tempData, setTempData] = useState({
    create_at: 0,
    is_paid: false,
    message: '',
    products: {},
    user: {
      address: '',
      email: '',
      name: '',
      tel: '',
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  // console.log(tempData, selectedOrder);
  useEffect(() => {
    console.log(selectedOrder);
    setTempData(selectedOrder);
  }, [selectedOrder]);

  function handleChange(e) {
    console.log('typed');
    console.log(e.target);
    const { name, value } = e.target;
    // console.log(e.target);
    setTempData({
      // ...tempData.user,
      ...tempData,
      user: {
        ...tempData.user,
        [name]: value,
      }
    });
  }

  async function submit() {
    setIsLoading(true);
    try {
      const res = await axios.put(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${selectedOrder.id}`, {
        data: tempData,
      });
      console.log(res);
      setIsLoading(false);
      alert(res.data.message);
      closeOrderModal();
      getOrders();
    } catch (error) {
      console.log(error.response.message)
      setIsLoading(false);
    }
  }

  return (
    <div
      className="modal fade"
      id="orderModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      // aria-hidden='true'
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content px-2 py-1">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              編輯訂單
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeOrderModal}
              // bs-data-dismiss='modal'
            />
          </div>
          {tempData && (
            <div className="modal-body">
              <h2 className="card-title mb-2 fs-5">訂單編號：{selectedOrder?.id}</h2>
              <div className="row">
                <div className="col-sm-7 pe-4">
                  <p>
                    <span
                      className={`badge rounded-pill text-light me-1 ${
                        tempData.is_paid ? 'text-bg-success' : 'text-bg-danger'
                      }`}
                    >
                      {tempData.is_paid ? '已付款' : '未付款'}
                    </span>
                    訂單日期：{tempData.create_at}
                  </p>
                  <div className="mt-2">
                    {Object.entries(tempData.products).map(([key, product]) => (
                      <div className="d-flex">
                        <img
                          key={key}
                          src={product.product.imageUrl}
                          alt={product.product.title}
                          className="me-2"
                          width="15%"
                        />
                        <p>
                          {product.product.title} * {product.qty}
                        </p>
                      </div>
                    ))}
                  </div>
                  <hr />
                  <div className="mt-2">
                    <div className="d-flex justify-content-between">
                      <p>小計：</p>
                      <span>${tempData?.total?.toLocaleString()}</span>
                    </div>
                    {/* TODO: coupon order API 沒有 coupon code */}
                    <div className="d-flex justify-content-between">
                      <p>折扣碼：</p> <span>{tempData.coupon || '無'}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>總金額：</p>
                      <span>${tempData?.total?.toLocaleString()} </span>
                    </div>
                  </div>
                </div>
                <div className="col-sm-5">
                  <div>
                    <div className="form-group mb-2">
                      <label className="w-100" htmlFor="name">
                        姓名：
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="form-control"
                          onChange={handleChange}
                          value={tempData.user.name}
                        />
                      </label>
                    </div>
                    <div className="form-group mb-2">
                      <label className="w-100" htmlFor="email">
                        電子郵件：
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="form-control"
                          onChange={handleChange}
                          value={tempData.user.email}
                        />
                      </label>
                    </div>
                    <div className="form-group mb-2">
                      <label className="w-100" htmlFor="phone">
                        電話：
                        <input
                          type="tel"
                          name="tel"
                          id="phone"
                          className="form-control"
                          onChange={handleChange}
                          value={tempData.user.tel}
                        />
                      </label>
                    </div>
                    <div className="form-group mb-2">
                      地址：
                      <label className="w-100" htmlFor="address">
                        <input
                          type="text"
                          name="address"
                          id="address"
                          className="form-control"
                          onChange={handleChange}
                          value={tempData.user.address}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <pre className="py-3"> {JSON.stringify(tempData.user)}</pre>
            </div>
          )}
          <div className="modal-footer flex-nowrap">
            <button
              type="button"
              className="btn btn-outline-primary w-50"
              data-bs-dismiss="modal"
              onClick={closeOrderModal}
            >
              取消
            </button>
            <button
              type="button"
              className="btn btn-primary w-50"
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
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderModal;
