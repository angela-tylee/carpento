import { useState, useEffect } from 'react';
import axios from 'axios';

function CouponModal({ closeCouponModal, getCoupons, type, tempCoupon, currentPage}) {
  const [tempData, setTempData] = useState({
    "title": "",
    "is_enabled": 0,
    "percent": 80,
    "due_date": 0, 
    "code": ""
  })

  useEffect(() => {
    console.log(type, tempCoupon);
    if(type === 'create') {
      setTempData({
        "title": "",
        "is_enabled": 0,
        "percent": 80,
        "due_date": Date.now() + 7 * 24 * 60 * 60 * 1000, // default valid for one week
        "code": "",
      })
    } else if (type === 'edit') {
      setTempData(tempCoupon)
    }
  },[type, tempCoupon])


// Convert timestamp to datetime-local format
const formatDateForInput = (timestamp) => {
  const date = new Date(timestamp);
  return date.toISOString().slice(0, 16); // Format: "YYYY-MM-DDThh:mm"
};

  async function handleChange(e) {
    const { name, value, checked} = e.target;
    // console.log(e.target);
    if (name === 'is_enabled') {
      setTempData({
        ...tempData,
        [name]: Number(checked), // Ensure checked is number not boolean to post the right data type.
      })
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
    } 
    else {
      setTempData({
        ...tempData,
        [name]: value, // Others remain.
      })
    }
  }

  async function submit() {
    try {
      let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon`
      let method = 'post';
      if (type === 'edit') {
        method = 'put'
        api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${tempCoupon.id}`
      }
      const res = await axios[method](api, {
        data: tempData,
      });
      console.log(res);
      // console.log(tempData);
      closeCouponModal();
      getCoupons(currentPage);
    } catch (error) {
      console.log(error.response.message)
    }
  }

  return ( 
    <div
      className='modal fade'
      id='couponModal'
      tabIndex='-1'
      aria-labelledby='exampleModalLabel'
      // aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content px-2 py-1'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='exampleModalLabel'>
              { type === 'create' ? '建立新折扣碼' : `編輯：${tempData.code}` }
            </h1>
            <button
              type='button'
              className='btn-close'
              aria-label='Close'
              onClick={closeCouponModal}
              // bs-data-dismiss='modal'
            />
          </div>
          <div className='modal-body'>
              <pre className='py-3'> { JSON.stringify(tempData) }</pre>
            <div className='col-sm-12'>
              <div className='form-group mb-2'>
                <label className='w-100' htmlFor='code'>
                  折扣碼
                  <input
                    type='text'
                    id='code'
                    name='code'
                    placeholder='請輸入折扣碼'
                    className='form-control'
                    onChange={handleChange}
                    value={tempData.code}
                  />
                </label>
              </div>
              <div className='form-group mb-2'>
                <label className='w-100' htmlFor='title'>
                  說明
                  <input
                    type='text'
                    id='title'
                    name='title'
                    placeholder='請輸入敘述'
                    className='form-control'
                    onChange={handleChange}
                    value={tempData.title}
                  />
                </label>
              </div>
              <div className='row'>
                <div className='form-group mb-2 col-md-6'>
                <label className='w-100' htmlFor='percent'>
                  {/* TODO: 轉換折扣為 8折、20% of 等等，直觀數字 */}
                    折扣
                    <input
                      type='number'
                      id='percent'
                      name='percent'
                      placeholder='請輸入折扣'
                      className='form-control'
                      onChange={handleChange}
                      value={tempData.percent}
                    />
                  </label>
                </div>
                <div className='form-group mb-2 col-md-6'>
                  <label className='w-100' htmlFor='due_date'>
                    到期時間
                    <input
                      type='datetime-local'
                      id='due_date'
                      name='due_date'
                      className='form-control'
                      onChange={handleChange}
                      value={formatDateForInput(tempData.due_date)} 
                      required
                    />
                  </label>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className='form-group mb-2 col-md-6'>
                  <div className='form-check'>
                    <label
                      className='w-100 form-check-label'
                      htmlFor='is_enabled'
                    >
                      {/* QUESTION: 預設值為 is_enabled: 1，即使畫面上沒有勾？ 2024-12-09 https://courses.hexschool.com/courses/react-video-course/lectures/45741586 Ans: https://courses.hexschool.com/courses/react-video-course/lectures/45741610*/}
                      是否啟用
                      <input
                        type='checkbox'
                        id='is_enabled'
                        name='is_enabled'
                        placeholder='請輸入產品說明內容'
                        className='form-check-input'
                        onChange={handleChange}
                        checked={tempData.is_enabled}
                        // value={tempData.is_enabled}
                      />
                    </label>
                  </div>
                </div>
                {type === 'edit' && <div className="mb-2 col-md-6 text-end">
                  <button
                    type="button"
                    className="btn border-0 text-danger btn-md p-0"
                    // onClick={openDeleteModal}
                    data-bs-target="#deleteModal" data-bs-toggle="modal"
                  >
                    <i className="bi bi-trash3"></i> 刪除折扣碼
                  </button>
                </div>}
              </div>
            </div>
          </div>
          <div className='modal-footer flex-nowrap'>
            <button type='button' className='btn btn-outline-primary w-50' data-bs-dismiss="modal" 
            onClick={closeCouponModal}
            >
              取消
            </button>
            <button type='button' className='btn btn-primary w-50' onClick={submit}>
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CouponModal;