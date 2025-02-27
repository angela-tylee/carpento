import { useState, useEffect } from 'react';
import axios from 'axios';
import PRODUCTS_CATEGORIES from '../constants/categories';
import BlogEditor from './BlogEditor';

const ProductModal = ({
  closeProductModal,
  getProducts,
  type,
  tempProduct,
  currentPage,
  showMessage,
}) => {
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
  }, [type, tempProduct]);

  const handleChange = async (e, editorData) => {
    const { name, value, checked, files } = e.target;
    if (['price', 'origin_price'].includes(name)) {
      setTempData({
        ...tempData,
        [name]: Number(value),
      });
    } else if (name === 'is_enabled') {
      setTempData({
        ...tempData,
        [name]: Number(checked),
      });
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
      setTempData((tempData) => ({
        ...tempData,
        [name]: value,
      }));
    }
  };

  const uploadImages = async (e) => {
    e.preventDefault();
    setIsLoadingImg(true);

    if (tempData.imagesUrl?.length >= 5) {
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
          imagesUrl: [...(prev.imagesUrl || []), res.data.imageUrl],
        }));

        setIsLoadingImg(false);
      } catch (error) {
        setIsLoadingImg(false);
      }
    } else {
      if (uploadImageUrl) {
        setTempData((prev) => ({
          ...prev,
          imagesUrl: [...(prev.imagesUrl || []), uploadImageUrl.trim()],
        }));
        setIsLoadingImg(false);
        setUploadImageUrl('');
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

  const submit = async () => {
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
      setIsLoading(false);
      // showMessage('success', `成功：${res.data.message}`);
      showMessage('success', `Success：${res.data.message}`);
      closeProductModal();
      getProducts(currentPage);
    } catch (error) {
      setIsLoading(false);
      // showMessage('danger', `失敗：${error.response.data.message}`);
      showMessage('danger', `Error: ${error.response.data.message}`);
    }
  };

  return (
    <div
      className="modal fade"
      id="productModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content px-2 py-1">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {/* {type === 'create' ? '建立新商品' : `編輯：${tempData?.title}`} */}
              {type === 'create' ? 'Create New Product' : `Edit: ${tempData?.title}`}
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeProductModal}
              bs-data-dismiss="modal"
            />
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-sm-8">
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="title">
                    {/* 標題 */}
                    Title
                    <input
                      type="text"
                      id="title"
                      name="title"
                      // placeholder="請輸入標題"
                      placeholder="Enter title"
                      className="form-control"
                      onChange={handleChange}
                      value={tempData.title}
                    />
                  </label>
                </div>
                <div className="form-group mb-2">
                  <label className="w-100" htmlFor="description">
                    {/* 產品描述 */}
                    Description
                    <textarea
                      type="text"
                      id="description"
                      name="description"
                      // placeholder="請輸入產品描述"
                      placeholder="Please enter product description"
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
                      {/* 產品介紹 */}
                      Introduction
                      <BlogEditor
                        editorData={tempData?.content?.info}
                        handleEditorChange={(data) =>
                          handleChange({ target: { name: 'info' } }, data)
                        }
                      />
                    </label>
                    <label htmlFor="size" className="w-100">
                      {/* 規格 */}
                      Spec
                      <BlogEditor
                        editorData={tempData?.content?.size}
                        handleEditorChange={(data) =>
                          handleChange({ target: { name: 'size' } }, data)
                        }
                      />
                    </label>
                    <label htmlFor="maintenance" className="w-100">
                      {/* 保養說明 */}
                      Maintenance
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
                      {/* 分類 */}
                      Category
                      <select
                        id="category"
                        name="category"
                        className="form-control"
                        onChange={handleChange}
                        value={tempData.category}
                      >
                        <option value="" disabled>
                          {/* 請選擇分類 */}
                          Choose Category
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
                    <label className="w-100" htmlFor="tag">
                      {/* 標籤 */}
                      Tags
                      <select
                        id=""
                        name="tag"
                        className="form-control"
                        onChange={handleChange}
                        value={tempData.tag || ''}
                      >
                        {/* <option value="">請選擇標籤</option> */}
                        <option value="">Choose tag</option>
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
                      {/* 售價 */}
                      Price
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
                      {/* 原價 */}
                      Original Price
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
                        {/* 是否啟用 */}
                        Enable the product?
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
                        {/* <i className="bi bi-trash3"></i> 刪除商品 */}
                        <i className="bi bi-trash3"></i> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-sm-4">
                <div className="col-12 mb-2">
                  <form onSubmit={uploadImages}>
                    {/* <label htmlFor="imageUrl">輸入圖片網址</label> */}
                    <label htmlFor="imageUrl">Add Images</label>
                    <div className="d-flex">
                      <input
                        type="text"
                        name="imagesUpload"
                        id="imageUrl"
                        // placeholder="請輸入圖片網址"
                        placeholder="Enter Image URL"
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
                    className="bg-secondary border border-2 border-secondary text-body-tertiary d-flex align-items-center justify-content-center pointer opacity-hover"
                    style={{ height: '150px' }}
                  >
                    <input
                      type="file"
                      name="imagesUpload"
                      onChange={handleChange}
                      className="d-none"
                      id="imageFile"
                    />
                    {/* <i className="bi bi-plus"></i>或點擊上傳圖片檔案 */}
                    <i className="bi bi-plus"></i>or click here to upload files
                    <i className="bi bi-image ms-1"></i>
                  </label>
                </div>
                <div className="row g-2 mb-2">
                  {(tempData.imagesUrl?.length > 0 || isLoadingImg) && (
                    <>
                      <div className="col-sm-12">
                        {isLoadingImg && tempData.imagesUrl?.length === 0 ? (
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
                              src={tempData.imagesUrl?.[0]}
                              alt={`${tempData.title}-1`}
                              className="img-fluid w-100"
                            />
                            <button
                              onClick={() => deleteImage(0)}
                              className="btn btn-secondary btn-sm position-absolute top-0 end-0 m-1 rounded-circle opacity-50"
                              style={{ padding: '1px 3px 0px 4px' }}
                            >
                              <i className="bi bi-x text-dark"></i>
                            </button>
                          </div>
                        )}
                      </div>
                      {tempData.imagesUrl.slice(1).map((url, index) => (
                        <div key={index} className="col-sm-6">
                          <div className="position-relative opacity-hover">
                            <img
                              src={url}
                              alt={`${tempData.title}-${index + 2}`}
                              className="img-fluid"
                            />
                            <button
                              onClick={() => deleteImage(index + 1)}
                              className="btn btn-secondary btn-sm position-absolute top-0 end-0 m-1 rounded-circle opacity-50"
                              style={{ padding: '1px 3px 0px 4px' }}
                            >
                              <i className="bi bi-x text-dark"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                      {isLoadingImg && tempData.imagesUr?.length >= 1 && (
                        <div className="col-sm-6">
                          <div
                            className="d-flex justify-content-center align-items-center"
                            style={{ height: '150px' }}
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
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer flex-nowrap">
            <button
              type="button"
              className="btn btn-outline-primary w-50"
              data-bs-dismiss="modal"
              onClick={closeProductModal}
            >
              {/* 取消 */}
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
              {/* 儲存 */}
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
