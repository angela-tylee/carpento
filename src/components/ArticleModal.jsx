import { useState, useEffect } from 'react';
import axios from 'axios';
import BlogEditor from './BlogEditor';
import FullPageLoader from './FullPageLoader';

function ArticleModal({
  closeArticleModal,
  getArticles,
  type,
  tempArticle,
  currentPage,
  showMessage,
  isLoadingModal,
  openDeleteModal,
}) {
  // const [uploadImageUrl, setUploadImageUrl] = useState(null);
  const [tempData, setTempData] = useState({
    title: '',
    description: '',
    image: '',
    tag: [''],
    create_at: '',
    author: '',
    isPublic: false,
    content: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingImg, setIsLoadingImg] = useState(false);

  useEffect(() => {
    if (type === 'create') {
      setTempData({
        title: '',
        description: '',
        image: '',
        tag: [''],
        create_at: Date.now(),
        author: '',
        isPublic: false,
        content: '',
      });
    } else if (type === 'edit') {
      setTempData(tempArticle);
    }
  }, [type, tempArticle]);

  async function handleChange(e, editorData) {
    const { name, value, checked, files } = e?.target || {};
    if (name === 'isPublic') {
      setTempData({
        ...tempData,
        [name]: checked,
      });
    } else if (name === 'imageUpload') {
      await uploadImage(files[0]);
    } else if (['description', 'content'].includes(name)) {
      setTempData((tempData) => ({
        ...tempData,
        [name]: editorData,
      }));
    } else {
      setTempData({
        ...tempData,
        [name]: value,
      });
    }
  }

  async function uploadImage(file) {
    setIsLoadingImg(true);
    if (!file) return;

    const formData = new FormData();
    formData.append('file-to-upload', file);

    try {
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/upload`,
        formData
      );
      // QUESTION: 用 setUploadImageUrl 設定預覽圖片的話，總是要再上傳一次 file 才可以顯示新的預覽圖片，否則會卡在前一張 Why? 2024-12-15 什麼都沒做又可以了？ 2024-12-16 Cause: Synchronous https://claude.ai/chat/4719c032-6f41-4292-9cec-9d6a25d622c7 2024-12-20
      // setUploadImageUrl(res.data.imageUrl);
      setTempData({
        ...tempData,
        image: res.data.imageUrl,
      });

      setIsLoadingImg(false);
    } catch (error) {
      setIsLoadingImg(false);
    }
  }

  async function submit() {
    setIsLoading(true);
    try {
      let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/article`;
      let method = 'post';
      if (type === 'edit') {
        method = 'put';
        api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/article/${tempArticle.id}`;
      }
      const res = await axios[method](api, {
        data: tempData,
      });
      setIsLoading(false);
      showMessage('success', `成功：${res.data.message}`);
      closeArticleModal();
      getArticles(currentPage);
    } catch (error) {
      setIsLoading(false);
      showMessage('success', `失敗：${error.response.data.message}`);
    }
  }

  return (
    <div
      className="modal fade"
      id="articleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content px-2 py-1">
          {isLoadingModal ? (
            <div style={{ height: 'calc(100vh - 56px)' }}>
              <FullPageLoader />
            </div>
          ) : (
            <>
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  {type === 'create' ? '建立新文章' : `編輯：${tempData.title}`}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeArticleModal}
                  bs-data-dismiss='modal'
                />
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="form-group mb-2">
                    <label className="w-100" htmlFor="title">
                      文章標題
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
                  <div className="row">
                    <div className="form-group mb-2 col-md-6">
                      <label className="w-100" htmlFor="author">
                        作者
                        <input
                          type="text"
                          id="author"
                          name="author"
                          placeholder="請輸入作者"
                          className="form-control"
                          onChange={handleChange}
                          value={tempData.author}
                        />
                      </label>
                    </div>
                    <div className="form-group mb-2 col-md-6">
                      <label className="w-100" htmlFor="create_at">
                        {/* QUESTION: input type="date" doesn't match API Date.now() data type, 再順一次 */}
                        建立日期
                        <input
                          type="text"
                          id="create_at"
                          name="create_at"
                          className="form-control border-0"
                          onChange={handleChange}
                          value={(() => {
                            const date = new Date(tempData.create_at);

                            const options = {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit',
                            };

                            return date.toLocaleString('en-US', options);
                          })()}
                          tabIndex="-1"
                          readOnly
                        />
                      </label>
                    </div>
                  </div>
                  <div className="form-group mb-2">
                    <label className="w-100" htmlFor="description">
                      文章描述
                      {/* <textarea
                      type='text'
                      id='description'
                      name='description'
                      placeholder='請輸入文章描述'
                      className='form-control'
                      onChange={handleChange}
                      value={tempData.description}
                    /> */}
                      <BlogEditor
                        editorData={tempData.description}
                        handleEditorChange={(data) =>
                          handleChange(
                            { target: { name: 'description' } },
                            data
                          )
                        }
                      />
                    </label>
                  </div>
                  <div className="form-group mb-2">
                    <label className="w-100" htmlFor="content">
                      文章內容
                      {/* <textarea
                      type='text'
                      id='content'
                      name='content'
                      placeholder='請輸入文章內容'
                      className='form-control'
                      onChange={handleChange}
                      value={tempData.content}
                    /> */}
                      <BlogEditor
                        editorData={tempData.content}
                        handleEditorChange={(data) =>
                          handleChange({ target: { name: 'content' } }, data)
                        }
                      />
                    </label>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="form-group mb-2">
                        <label className="w-100" htmlFor="image">
                          輸入圖片網址
                          <input
                            type="text"
                            name="image"
                            id="image"
                            placeholder="請輸入圖片連結"
                            className="form-control"
                            onChange={handleChange}
                            value={tempData.image}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group mb-2">
                        <label className="w-100" htmlFor="customFile">
                          或 上傳圖片
                          <input
                            type="file"
                            name="imageUpload"
                            id="customFile"
                            className="form-control"
                            onChange={handleChange}
                            disabled={isLoadingImg}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mb-2">
                    {isLoadingImg ? (
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ height: '300px' }}
                      >
                        <div
                          className={`spinner-border text-secondary opacity-50`}
                          style={{ width: '80px', height: '80px' }}
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : tempData.image ? (
                      <img
                        src={tempData.image}
                        alt="preview"
                        className="img-fluid"
                      />
                    ) : (
                      'Add image to preview'
                    )}
                  </div>
                  <div className="row">
                    <div className="form-group mb-2 col-md-12">
                      <label className="w-100" htmlFor="tag">
                        標籤
                        <input
                          type="text"
                          id="tag"
                          name="tag"
                          placeholder="請輸入標籤"
                          className="form-control"
                          onChange={handleChange}
                          value={tempData.tag}
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
                          htmlFor="isPublic"
                        >
                          是否發布
                          <input
                            type="checkbox"
                            id="isPublic"
                            name="isPublic"
                            className="form-check-input"
                            onChange={handleChange}
                            checked={tempData.isPublic}
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
                          <i className="bi bi-trash3"></i> 刪除文章
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
                  onClick={closeArticleModal}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticleModal;
