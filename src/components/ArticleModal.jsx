import { useState, useEffect } from 'react';
import axios from 'axios';
import BlogEditor from './BlogEditor';

function ArticleModal({ closeArticleModal, getArticles, type, tempArticle, openDeleteModal }) {
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

  useEffect(() => {
    console.log(type, tempArticle);
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
    // console.log(e.target);
    if (name === 'isPublic') {
      setTempData({
        ...tempData,
        [name]: checked,
        // [name]: Number(checked), // Ensure checked is number not boolean to post the right data type.
      });
    } else if (name === 'imageUpload') {
      await uploadImage(files[0]);
      // setTempData({
      //   ...tempData,
      //   "image": uploadImageUrl
      // })
      // } else if (name === 'create_at') {
      //   setTempData({
      //     ...tempData,
      //     [name]: tempData.create_at,
      //   })
    } else if (['description', 'content'].includes(name)) {
      setTempData( tempData => ({
        ...tempData,
        [name]: editorData,
      }));
    } else {
      setTempData({
        ...tempData,
        [name]: value, // Others remain.
      });
    }
  }

  // const handleEditorChange = (data) => {
  //   setTempData({
  //     ...tempData,
  //     description: data, // Update the content field with CKEditor data
  //   });
  // };

  async function uploadImage(file) {
    console.log(file);
    if (!file) return;

    const formData = new FormData();
    formData.append('file-to-upload', file);

    try {
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/upload`,
        formData
      );
      // FIXME: 總是要再上傳一次 file 才可以顯示新的預覽圖片，否則會卡在前一張 Why? 2024-12-15 什麼都沒做又可以了？ 2024-12-16 Cause: Synchronous https://claude.ai/chat/4719c032-6f41-4292-9cec-9d6a25d622c7 2024-12-20

      // setUploadImageUrl(res.data.imageUrl);
      setTempData({
        ...tempData,
        image: res.data.imageUrl,
      });

      console.log(tempData);
    } catch (error) {
      console.log(error);
    }
  }

  async function submit() {
    console.log(tempArticle.id);
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
      console.log(res);
      console.log('submit', tempData, tempArticle);
      closeArticleModal();
      getArticles();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className="modal fade"
      id="articleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      // aria-hidden='true'
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content px-2 py-1">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {type === 'create' ? '建立新文章' : `編輯：${tempData.title}`}
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeArticleModal}
              // bs-data-dismiss='modal'
            />
          </div>
          <div className="modal-body">
            <pre className="py-3"> {JSON.stringify(tempData)}</pre>
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
                    {/* FIXME: input type="date" doesn't match API Date.now() data type */}
                    建立日期
                    <input
                      type="text"
                      id="create_at"
                      name="create_at"
                      // placeholder='請輸入日期'
                      className="form-control border-0"
                      onChange={handleChange}
                      // value={tempData.create_at}
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
                      handleChange({ target: { name: 'description' } }, data)
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
                        // TODO: Upload storage.imageURL to temp.imageUrl 2024-12-15
                        // onChange={(e) => uploadImage(e.target.files[0])}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-2">
                {/* <img src={uploadImageUrl} alt="preview" width="100%" className="mt-4"/> */}
                {/* TODO: 不要暴露 storage.imageURL，考慮 {tempData.imageUrl || tempData.imageUpload} 2024-12-17 */}
                {tempData.image ? (
                  <img
                    src={tempData.image}
                    alt="preview"
                    className="img-fluid"
                  />
                ) : (
                  'Add image to preview'
                )}
                {/* <img src={uploadImageUrl} alt="preview" className="img-fluid"/> */}
              </div>
              <div className="row">
                <div className="form-group mb-2 col-md-12">
                  <label className="w-100" htmlFor="tag">
                    {/* FIXME: 無法輸入超過 2 個字？？？ */}
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
                      {/* FIXME: checkbox 無法正常運作 */}
                      是否發布
                      <input
                        type="checkbox"
                        id="isPublic"
                        name="isPublic"
                        className="form-check-input"
                        onChange={handleChange}
                        checked={tempData.isPublic}
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
                      // onClick={() => openDeleteModal(tempArticle)}
                      data-bs-target="#deleteModal" data-bs-toggle="modal"
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
            >
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleModal;
