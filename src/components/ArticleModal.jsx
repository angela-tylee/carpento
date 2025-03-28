import { useState, useEffect } from 'react';
import axios from 'axios';
import BlogEditor from './BlogEditor';
import FullPageLoader from './FullPageLoader';

const ArticleModal = ({
  closeArticleModal,
  getArticles,
  type,
  tempArticle,
  currentPage,
  showMessage,
  isLoadingModal,
}) => {
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

  const handleChange = async(e, editorData) => {
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

  const uploadImage = async (file) => {
    setIsLoadingImg(true);
    if (!file) return;

    const formData = new FormData();
    formData.append('file-to-upload', file);

    try {
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/upload`,
        formData
      );
      setTempData({
        ...tempData,
        image: res.data.imageUrl,
      });

      setIsLoadingImg(false);
    } catch (error) {
      setIsLoadingImg(false);
    }
  }

  const submit = async () => {
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
      showMessage('success', `Success: ${res.data.message}`);
      closeArticleModal();
      getArticles(currentPage);
    } catch (error) {
      setIsLoading(false);
      showMessage('success', `Error: ${error.response.data.message}`);
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
                  {type === 'create' ? 'Create New Article' : `Edit: ${tempData.title}`}
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
                      Title
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter title"
                        className="form-control"
                        onChange={handleChange}
                        value={tempData.title}
                      />
                    </label>
                  </div>
                  <div className="row">
                    <div className="form-group mb-2 col-md-6">
                      <label className="w-100" htmlFor="author">
                        Author
                        <input
                          type="text"
                          id="author"
                          name="author"
                          placeholder="Enter author name"
                          className="form-control"
                          onChange={handleChange}
                          value={tempData.author}
                        />
                      </label>
                    </div>
                    <div className="form-group mb-2 col-md-6">
                      <label className="w-100" htmlFor="create_at">
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
                      Description
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
                      Content
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
                          Add image URL
                          <input
                            type="text"
                            name="image"
                            id="image"
                            placeholder="Enter image URL"
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
                          Or upload file
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
                        Tags
                        <input
                          type="text"
                          id="tag"
                          name="tag"
                          placeholder="Enter tags"
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
                          Publish the article?
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
                  onClick={closeArticleModal}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticleModal;
