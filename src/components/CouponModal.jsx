import { useState, useEffect } from 'react';
import axios from 'axios';

const CouponModal = ({
  closeCouponModal,
  getCoupons,
  type,
  tempCoupon,
  currentPage,
  showMessage,
}) => {
  const [tempData, setTempData] = useState({
    title: '',
    is_enabled: 0,
    percent: 80,
    due_date: 0,
    code: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (type === 'create') {
      setTempData({
        title: '',
        is_enabled: 0,
        percent: 80,
        due_date: Date.now() + 7 * 24 * 60 * 60 * 1000,
        code: '',
      });
    } else if (type === 'edit') {
      setTempData(tempCoupon);
    }
  }, [type, tempCoupon]);

  const formatDateForInput = (timestamp) => {
    const date = new Date(timestamp);
    return date.toISOString().slice(0, 16); 
  };

  const handleChange = async (e) => {
    const { name, value, checked } = e.target;
    if (name === 'is_enabled') {
      setTempData({
        ...tempData,
        [name]: Number(checked),
      });
    } else if (name === 'percent') {
      setTempData({
        ...tempData,
        [name]: Number(value),
      });
    } else if (name === 'due_date') {
      setTempData({
        ...tempData,
        [name]: new Date(value).getTime(),
      });
    } else {
      setTempData({
        ...tempData,
        [name]: value,
      });
    }
  };

  const submit = async () => {
    setIsLoading(true);
    try {
      let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon`;
      let method = 'post';
      if (type === 'edit') {
        method = 'put';
        api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${tempCoupon.id}`;
      }
      const res = await axios[method](api, {
        data: tempData,
      });
      setIsLoading(false);
      closeCouponModal();
      showMessage('success', `Success: ${res.data.message}`);
      getCoupons(currentPage);
    } catch (error) {
      setIsLoading(false);
      showMessage('danger', `Error: ${error.response.data.message}`);
    }
  };

  return (
    <div
      className="modal fade"
      id="couponModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content px-2 py-1">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {type === 'create' ? 'Create New Coupon' : `Edit: ${tempData.code}`}
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeCouponModal}
              bs-data-dismiss="modal"
            />
          </div>
          <div className="modal-body">
            <div className="col-sm-12">
              <div className="form-group mb-2">
                <label className="w-100" htmlFor="code">
                  Code
                  <input
                    type="text"
                    id="code"
                    name="code"
                    placeholder="Enter coupon code"
                    className="form-control"
                    onChange={handleChange}
                    value={tempData.code}
                  />
                </label>
              </div>
              <div className="form-group mb-2">
                <label className="w-100" htmlFor="title">
                  Description
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter description"
                    className="form-control"
                    onChange={handleChange}
                    value={tempData.title}
                  />
                </label>
              </div>
              <div className="row">
                <div className="form-group mb-2 col-md-6">
                  <label className="w-100" htmlFor="percent">
                    Discount %
                    <input
                      type="number"
                      id="percent"
                      name="percent"
                      placeholder="Enter discount percentage"
                      className="form-control"
                      onChange={handleChange}
                      value={tempData.percent}
                    />
                  </label>
                </div>
                <div className="form-group mb-2 col-md-6">
                  <label className="w-100" htmlFor="due_date">
                    Due Date
                    <input
                      type="datetime-local"
                      id="due_date"
                      name="due_date"
                      className="form-control"
                      onChange={handleChange}
                      value={formatDateForInput(tempData.due_date)}
                      required
                    />
                  </label>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="form-group mb-2 col-md-6">
                  <div className="form-check">
                    <label
                      className="w-100 form-check-label"
                      htmlFor="is_enabled"
                    >
                      Enable the coupon?
                      <input
                        type="checkbox"
                        id="is_enabled"
                        name="is_enabled"
                        className="form-check-input"
                        onChange={handleChange}
                        checked={tempData.is_enabled}
                      />
                    </label>
                  </div>
                </div>
                {type === 'edit' && (
                  <div className="mb-2 col-md-6 text-end">
                    <button
                      type="button"
                      className="btn border-0 text-danger btn-md p-0"
                      data-bs-target="#deleteModal"
                      data-bs-toggle="modal"
                    >
                      <i className="bi bi-trash3"></i> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="modal-footer flex-nowrap">
            <button
              type="button"
              className="btn btn-outline-primary w-50"
              data-bs-dismiss="modal"
              onClick={closeCouponModal}
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

export default CouponModal;
