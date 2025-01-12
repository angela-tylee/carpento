import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PRODUCTS_CATEGORIES from '../constants/categories';
import BlogEditor from './BlogEditor';

function ProductModal({
  closeProductModal,
  getProducts,
  type,
  tempProduct,
  currentPage,
  // isLoadingModal,
}) {
  const [tempData, setTempData] = useState({
    title: '',
    category: '',
    origin_price: 0,
    price: 0,
    unit: '',
    description: '',
    content: {
      info: '',
      size: '',
      maintenance: '',
    },
    is_enabled: 1,
    imageUrl: '',
    imagesUrl: [],
    tag: '',
  });
  const [uploadImageUrl, setUploadImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingImg, setIsLoadingImg] = useState(false);

  useEffect(() => {
    if (type === 'create') {
      setTempData({
        title: '',
        category: '',
        origin_price: 0,
        price: 0,
        unit: 'unit',
        description: '',
        content: {
          info: '',
          size: '',
          maintenance: '',
        },
        is_enabled: 1,
        imageUrl: '',
        imagesUrl: [],
        tag: '',
      });
    } else if (type === 'edit') {
      setTempData(tempProduct);
    }

    console.log(type, tempProduct);
  }, [type, tempProduct]);

  async function handleChange(e, editorData) {
    const { name, value, checked, files } = e.target;
    // console.log(e.target);
    if (['price', 'origin_price'].includes(name)) {
      setTempData({
        ...tempData,
        [name]: Number(value), // Ensure prices are number not string types.
      });
    } else if (name === 'is_enabled') {
      setTempData({
        ...tempData,
        // [name]: +e.target.is_enabled
        [name]: Number(checked), // Ensure checked is number not boolean to post the right data type.
      });
      // } else if (name === 'imageUpload' && files[0]) {
      //   await uploadImage(files[0]);
    } else if (name === 'imagesUpload') {
      await uploadImages(e);
    } else if (['info', 'size', 'maintenance'].includes(name)) {
      setTempData((tempData) => ({
        ...tempData,
        content: {
          ...tempData.content,
          [name]: editorData,
        },
      }));
    } else {
      setTempData({
        ...tempData,
        [name]: value, // Others remain.
      });
    }
  }

  // async function uploadImage(file) {
  //   console.log(file);
  //   if (!file) return;

  //   // QUESTION: How does `FormData()` work? 2024-12-15
  //   const formData = new FormData();
  //   formData.append('file-to-upload', file);

  //   try {
  //     const res = await axios.post(
  //       `/v2/api/${process.env.REACT_APP_API_PATH}/admin/upload`,
  //       formData
  //     );

  //     setTempData({
  //       ...tempData,
  //       imageUrl: res.data.imageUrl,
  //     });

  //     console.log(tempData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const uploadImages = async (e) => {
    e.preventDefault();
    console.log(e);
    setIsLoadingImg(true);

    console.log('length', tempData.imagesUrl.length);

    if (tempData.imagesUrl.length >= 5) {
      alert('最多上傳 5 張照片');
      return;
    }

    const { files } = e.target;

    if (files?.[0]) {
      const formData = new FormData();
      formData.append('file-to-upload', files[0]);

      try {
        const res = await axios.post(
          `/v2/api/${process.env.REACT_APP_API_PATH}/admin/upload`,
          formData
        );

        setTempData((prev) => ({
          ...prev,
          imagesUrl: [...prev.imagesUrl, res.data.imageUrl],
        }));

        console.log(tempData);
        setIsLoadingImg(false);
      } catch (error) {
        console.log(error);
        setIsLoadingImg(false);
      }
    } else {
      // Get URL from form data instead of state
      // const formData = new FormData(e.target);
      // const imageUrl = formData.get('imageUrl').trim();

      if (uploadImageUrl) {
        setTempData((prev) => ({
          ...prev,
          imagesUrl: [...prev.imagesUrl, uploadImageUrl.trim()],
        }));
        setUploadImageUrl(''); // Clear form
      }
    }
  };

  const deleteImage = (indexToDelete) => {
    setTempData((tempData) => ({
      ...tempData,
      imagesUrl: tempData.imagesUrl.filter(
        (_, index) => index !== indexToDelete
      ),
    }));
  };

  async function submit() {
    setIsLoading(true);
    try {
      let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product`;
      let method = 'post';
      if (type === 'edit') {
        method = 'put';
        api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${tempProduct.id}`;
      }
      const res = await axios[method](api, {
        data: tempData,
      });
      console.log(res);
      setIsLoading(false);
      alert(res.data.message);
      closeProductModal();
      getProducts(currentPage);
    } catch (error) {
      console.log(error.response.message);
      setIsLoading(false);
    }
  }

  return (
    <div
      className="modal fade"
      id="productModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      // aria-hidden='true'
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content px-2 py-1">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {type === 'create' ? '建立新商品' : `編輯：${tempData?.title}`}
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeProductModal}
              // bs-data-dismiss='modal'
            />
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-sm-8">
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="title">
                    標題
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="請輸入標題"
                      className="form-control"
                      onChange={handleChange}
                      value={tempData.title}
                    />
                  </label>
                </div>
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="description">
                    產品描述
                    <textarea
                      type="text"
                      id="description"
                      name="description"
                      placeholder="請輸入產品描述"
                      className="form-control"
                      onChange={handleChange}
                      value={tempData.description}
                    />
                  </label>
                </div>
                {tempData && (
                  <div className="form-group mb-2">
                    {/* <label className='w-100' htmlFor='content'>
                    說明內容
                    <textarea
                      type='text'
                      id='content'
                      name='content'
                      placeholder='請輸入產品說明內容'
                      className='form-control'
                      rows="10"
                      onChange={handleChange}
                      value={tempData.content}
                    />
                    </label> */}
                    <label htmlFor="info" className="w-100">
                      產品介紹
                      <BlogEditor
                        editorData={tempData?.content?.info}
                        handleEditorChange={(data) =>
                          handleChange({ target: { name: 'info' } }, data)
                        }
                      />
                    </label>
                    <label htmlFor="size" className="w-100">
                      規格
                      <BlogEditor
                        editorData={tempData?.content?.size}
                        handleEditorChange={(data) =>
                          handleChange({ target: { name: 'size' } }, data)
                        }
                      />
                    </label>
                    <label htmlFor="maintenance" className="w-100">
                      保養說明
                      <BlogEditor
                        editorData={tempData?.content?.maintenance}
                        handleEditorChange={(data) =>
                          handleChange(
                            { target: { name: 'maintenance' } },
                            data
                          )
                        }
                      />
                    </label>
                  </div>
                )}
                <hr />
                <div className="row">
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="category">
                      分類
                      <select
                        id="category"
                        name="category"
                        className="form-control"
                        onChange={handleChange}
                        value={tempData.category}
                      >
                        <option value="" disabled>
                          請選擇分類
                        </option>
                        {Object.keys(PRODUCTS_CATEGORIES).map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className="form-group mb-2 col-md-6">
                    {/* <label className="w-100" htmlFor="unit">
                      單位
                      <input
                        type="unit"
                        id="unit"
                        name="unit"
                        placeholder="請輸入單位"
                        className="form-control"
                        onChange={handleChange}
                        value={tempData.unit}
                      />
                    </label> */}
                    <label className="w-100" htmlFor="tag">
                      標籤
                      <select
                        id=""
                        name="tag"
                        className="form-control"
                        onChange={handleChange}
                        value={tempData.tag}
                      >
                        {/* FIXME: 如果前一個值不是空值，就會取到前一個值 */}
                        <option value="" disabled>
                          請選擇標籤
                        </option>
                        <option value="new">new</option>
                        <option value="sale">sale</option>
                        <option value="hot">hot</option>
                      </select>
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="price">
                      售價
                      <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="請輸入售價"
                        className="form-control"
                        onChange={handleChange}
                        value={tempData.price}
                      />
                    </label>
                  </div>
                  <div className="form-group mb-2 col-md-6">
                    <label className="w-100" htmlFor="origin_price">
                      原價
                      <input
                        type="number"
                        id="origin_price"
                        name="origin_price"
                        placeholder="請輸入原價"
                        className="form-control"
                        onChange={handleChange}
                        value={tempData.origin_price}
                      />
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group mb-2 col-md-6">
                    <div className="form-check">
                      <label
                        className="w-100 form-check-label"
                        htmlFor="is_enabled"
                      >
                        {/* QUESTION: 預設值為 is_enabled: 1，即使畫面上沒有勾？ 2024-12-09 https://courses.hexschool.com/courses/react-video-course/lectures/45741586 Ans: https://courses.hexschool.com/courses/react-video-course/lectures/45741610*/}
                        是否啟用
                        <input
                          type="checkbox"
                          id="is_enabled"
                          name="is_enabled"
                          placeholder="請輸入產品說明內容"
                          className="form-check-input"
                          onChange={handleChange}
                          checked={tempData.is_enabled}
                          // value={tempData.is_enabled}
                        />
                      </label>
                    </div>
                  </div>
                  {type === 'edit' && (
                    <div className="mb-2 col-md-6 text-end">
                      <button
                        type="button"
                        className="btn border-0 text-danger btn-md p-0"
                        // onClick={openDeleteModal}
                        data-bs-target="#deleteModal"
                        data-bs-toggle="modal"
                      >
                        <i className="bi bi-trash3"></i> 刪除商品
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-sm-4">
                <div className="col-12 mb-2">
                  <form
                    onSubmit={uploadImages}
                    // className="d-flex gap-2"
                  >
                    <label htmlFor="imageUrl">輸入圖片網址</label>
                    <div className="d-flex">
                      <input
                        type="text"
                        name="imagesUpload"
                        id="imageUrl"
                        placeholder="請輸入圖片網址"
                        className="form-control"
                        value={uploadImageUrl}
                        onChange={(e) => setUploadImageUrl(e.target.value)}
                      />
                      <button type="submit" className="btn btn-primary">
                        Add
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-12 mb-2">
                  <label
                    htmlFor="imageFile"
                    className="bg-secondary border border-2 border-secondary text-body-tertiary d-flex align-items-center justify-content-center opacity-hover"
                    style={{ height: '150px', cursor: 'pointer' }}
                  >
                    <input
                      type="file"
                      name="imagesUpload"
                      onChange={handleChange}
                      className="d-none"
                      id="imageFile"
                    />
                    <i class="bi bi-plus"></i>或點擊上傳圖片檔案
                    <i class="bi bi-image ms-1"></i>
                  </label>
                </div>
                <div className="row g-2 mb-2">
                  {tempData.imagesUrl.length > 0 || isLoadingImg ? (
                    <>
                      <div className="col-sm-12">
                        {isLoadingImg && tempData.imagesUrl.length === 0 ? (
                          <div
                            className="d-flex justify-content-center align-items-center"
                            style={{ height: '150px' }}
                          >
                            <div
                              className={`spinner-border text-secondary`}
                              style={{ width: '50px', height: '50px' }}
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="position-relative opacity-hover">
                            <img
                              src={tempData.imagesUrl[0]}
                              alt={`${tempData.title}-1`}
                              className="img-fluid w-100"
                              style={{ objectFit: 'cover' }}
                            />
                            <button
                              onClick={() => deleteImage(0)}
                              className="btn btn-secondary btn-sm position-absolute top-0 end-0 m-1 rounded-circle opacity-50"
                              style={{ padding: '1px 3px 0px 4px' }}
                            >
                              <i class="bi bi-x text-dark"></i>
                            </button>
                          </div>
                        )}
                      </div>
                      {tempData.imagesUrl.slice(1).map((url, index) => (
                        <div key={index} className="col-sm-6">
                          {/* FIXME: not showing loading effect */}
                          {isLoadingImg &&
                          tempData.imagesUrl.length === index + 1 ? (
                            <div
                              className="d-flex justify-content-center align-items-center"
                              style={{ height: '120px' }}
                            >
                              <div
                                className={`spinner-border text-secondary`}
                                style={{ width: '30px', height: '30px' }}
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="position-relative opacity-hover">
                              <img
                                src={url}
                                alt={`${tempData.title}-${index + 2}`}
                                className="img-fluid"
                                style={{ height: '120px', objectFit: 'cover' }}
                              />
                              <button
                                onClick={() => deleteImage(index + 1)}
                                className="btn btn-secondary btn-sm position-absolute top-0 end-0 m-1 rounded-circle opacity-50"
                                style={{ padding: '1px 3px 0px 4px' }}
                              >
                                <i class="bi bi-x text-dark"></i>
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </>
                  ) : (
                    ''
                  )}
                </div>
                <style>
                  {/* TODO: Separate CSS */}
                  {`
              .opacity-hover:hover { opacity: 0.8; transition: opacity 0.3s; }
            `}
                </style>

                {/* TODO: 不要暴露 storage.imageURL，考慮 {tempData.imageUrl || tempData.imageUpload} 2024-12-17 */}
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="image">
                    輸入圖片網址
                    <input
                      type="text"
                      name="imageUrl"
                      id="image"
                      placeholder="請輸入圖片連結"
                      className="form-control"
                      onChange={handleChange}
                      value={tempData.imageUrl}
                    />
                  </label>
                </div>
                {/* <div className="form-group mb-2">
                  <label className="w-100" htmlFor="customFile">
                    或 上傳圖片
                    <input
                      type="file"
                      name="imageUpload"
                      id="customFile"
                      className="form-control"
                      // onChange={(e) => uploadImage(e.target.files[0])}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                {tempData.imageUrl ? (
                  <img
                    src={tempData.imageUrl}
                    alt="preview"
                    className="img-fluid"
                  />
                ) : (
                  'Add image to preview'
                )} */}
              </div>
            </div>
            <pre className="py-3"> {JSON.stringify(tempProduct)}</pre>
            <pre className="py-3"> {JSON.stringify(tempData)}</pre>
          </div>
          <div className="modal-footer flex-nowrap">
            <button
              type="button"
              className="btn btn-outline-primary w-50"
              data-bs-dismiss="modal"
              onClick={closeProductModal}
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

export default ProductModal;
