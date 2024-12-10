import { useState } from 'react';
import axios from 'axios';
function ProductModal({ closeProductModal, getProducts }) {
  const [tempData, setTempData] = useState({
    "title": "",
    "category": "",
    "origin_price": 100,
    "price": 300,
    "unit": "",
    "description": "",
    "content": "",
    "is_enabled": 1,
    "imageUrl": "",
    "imagesUrl": [
      "",
      "",
      "",
      "",
      ""
    ]
  })

  function handleChange(e) {
    const { name, value, checked } = e.target;
    console.log(e.target);
    if (['price', 'origin_price'].includes(name)) {
      setTempData({
        ...tempData,
        [name]: Number(value),  // Ensure prices are number not string types.
      })
    } else if (name === 'is_enabled') {
      setTempData({
        ...tempData,
        // [name]: +e.target.is_enabled
        [name]: Number(checked), // Ensure checked is number not boolean to post the right data type.
      })
    } else {
      setTempData({
        ...tempData,
        [name]: value, // Others remain.
      })
    }
  }

  async function submit() {
    try {
      const res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/product`, {
        data: tempData,
      });
      console.log(res);
      closeProductModal();
      getProducts();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className='modal fade'
      id='productModal'
      tabIndex='-1'
      aria-labelledby='exampleModalLabel'
      // aria-hidden='true'
    >
      <div className='modal-dialog modal-xl'>
        <div className='modal-content px-2 py-1'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='exampleModalLabel'>
              建立新商品
            </h1>
            <button
              type='button'
              className='btn-close'
              aria-label='Close'
              onClick={closeProductModal}
              // bs-data-dismiss='modal'
            />
          </div>
          <div className='modal-body'>
            <div className='row'>
              <div className='col-sm-8'>
                {/* <pre className='py-3'> { JSON.stringify(tempData) }</pre> */}
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='title'>
                    標題
                    <input
                      type='text'
                      id='title'
                      name='title'
                      placeholder='請輸入標題'
                      className='form-control'
                      onChange={handleChange}
                      value={tempData.title}
                    />
                  </label>
                </div>
                <div className='row'>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='category'>
                      分類
                      <input
                        type='text'
                        id='category'
                        name='category'
                        placeholder='請輸入分類'
                        className='form-control'
                        onChange={handleChange}
                        value={tempData.category}
                      />
                    </label>
                  </div>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='unit'>
                      單位
                      <input
                        type='unit'
                        id='unit'
                        name='unit'
                        placeholder='請輸入單位'
                        className='form-control'
                        onChange={handleChange}
                        value={tempData.unit}
                      />
                    </label>
                  </div>
                </div>
                <div className='row'>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='origin_price'>
                      原價
                      <input
                        type='number'
                        id='origin_price'
                        name='origin_price'
                        placeholder='請輸入原價'
                        className='form-control'
                        onChange={handleChange}
                        value={tempData.origin_price}
                      />
                    </label>
                  </div>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='price'>
                      售價
                      <input
                        type='number'
                        id='price'
                        name='price'
                        placeholder='請輸入售價'
                        className='form-control'
                        onChange={handleChange}
                        value={tempData.price}
                      />
                    </label>
                  </div>
                </div>
                <hr />
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='description'>
                    產品描述
                    <textarea
                      type='text'
                      id='description'
                      name='description'
                      placeholder='請輸入產品描述'
                      className='form-control'
                      onChange={handleChange}
                      value={tempData.description}
                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='content'>
                    說明內容
                    <textarea
                      type='text'
                      id='content'
                      name='content'
                      placeholder='請輸入產品說明內容'
                      className='form-control'
                      onChange={handleChange}
                      value={tempData.content}
                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <div className='form-check'>
                    <label
                      className='w-100 form-check-label'
                      htmlFor='is_enabled'
                    >
                      {/* QUESTION: 預設值為 is_enabled: 1，即使畫面上沒有勾？ 2024-12-09 https://courses.hexschool.com/courses/react-video-course/lectures/45741586 */}
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
              </div>
              <div className='col-sm-4'>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='image'>
                    輸入圖片網址
                    <input
                      type='text'
                      name='imageUrl'
                      id='image'
                      placeholder='請輸入圖片連結'
                      className='form-control'
                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='customFile'>
                    或 上傳圖片
                    <input
                      type='file'
                      id='customFile'
                      className='form-control'
                    />
                  </label>
                </div>
                <img src="" alt='' className='img-fluid' />
              </div>
            </div>
          </div>
          <div className='modal-footer flex-nowrap'>
            <button type='button' className='btn btn-outline-primary w-50' data-bs-dismiss="modal" 
            onClick={closeProductModal}
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

export default ProductModal;