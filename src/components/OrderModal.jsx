import { useState, useEffect } from 'react';
import axios from 'axios';

const OrderModal = ({
  closeOrderModal,
  getOrders,
  selectedOrder,
  currentPage,
  showMessage,
}) => {
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

  useEffect(() => {
    setTempData(selectedOrder);
  }, [selectedOrder]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData({
      ...tempData,
      user: {
        ...tempData.user,
        [name]: value,
      },
    });
  };

  const submit = async () => {
    setIsLoading(true);
    try {
      const res = await axios.put(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${selectedOrder.id}`,
        {
          data: tempData,
        }
      );
      setIsLoading(false);
      showMessage('success', `Success: ${res.data.message}`);
      closeOrderModal();
      getOrders(currentPage);
    } catch (error) {
      setIsLoading(false);
      showMessage('danger', `Error: ${error.response.data.message}`);
    }
  };

  return (
    <div
      className="modal fade"
      id="orderModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content px-2 py-1">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Edit
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeOrderModal}
              bs-data-dismiss="modal"
            />
          </div>
          {tempData && (
            <div className="modal-body">
              <h2 className="card-title mb-2 fs-5">
                Order ID：{selectedOrder?.id}
              </h2>
              <div className="row">
                <div className="col-sm-7 pe-4">
                  <p>
                    <span
                      className={`badge rounded-pill text-light me-1 ${
                        tempData.is_paid ? 'text-bg-success' : 'text-bg-danger'
                      }`}
                    >
                      {tempData.is_paid ? 'Paid' : 'Unpaid'}
                    </span>
                    Order Date:
                    {(() => {
                      const date = new Date(tempData.create_at * 1000);

                      const options = {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      };

                      return date.toLocaleString('zh-TW', options);
                    })()}
                  </p>
                  <div className="mt-2">
                    {Object.entries(tempData.products).map(([key, product]) => (
                      <div className="d-flex mb-1" key={key}>
                        <img
                          src={product.product.imagesUrl[0]}
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
                      <span>
                        $
                        {Object.values(tempData.products)
                          ?.reduce((total, product) => total + product.total, 0)
                          ?.toLocaleString()}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Coupon Code：</p>
                      <span>
                        {Object.values(tempData.products)[0]?.coupon?.code ||
                          'none'}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Total：</p>
                      <span>${tempData?.total?.toLocaleString()} </span>
                    </div>
                  </div>
                </div>
                <div className="col-sm-5">
                  <div>
                    <div className="form-group mb-2">
                      <label className="w-100" htmlFor="name">
                        Name: 
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
                        Email：
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
                        Phone Number：
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
                      Shipping Address：
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
              <div className="mt-2 text-end">
                <button
                  type="button"
                  className="btn border-0 text-danger btn-md p-0"
                  data-bs-target="#deleteModal"
                  data-bs-toggle="modal"
                >
                  <i className="bi bi-trash3"></i> Delete
                </button>
              </div>
            </div>
          )}
          <div className="modal-footer flex-nowrap">
            <button
              type="button"
              className="btn btn-outline-primary w-50"
              data-bs-dismiss="modal"
              onClick={closeOrderModal}
            >
              Cancel
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
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
