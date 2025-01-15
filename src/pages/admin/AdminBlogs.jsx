import { useEffect, useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ArticleModal from '../../components/ArticleModal';
import DeleteModal from '../../components/DeleteModal';
import { Modal } from 'bootstrap';
import Pagination from '../../components/Pagination';
import Message from '../../components/Message';
import { MessageContext } from '../../context/MessageContext';
import FullPageLoader from '../../components/FullPageLoader';

const AdminProducts = () => {
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({});
  const [type, setType] = useState('create');
  const [tempArticle, setTempArticle] = useState({});
  const [isLoadingModal, setLoadingModal] = useState(false);
  const [isLoadingArticles, setIsLoadingArticles] = useState(false);

  const { message, messageType, showMessage } = useContext(MessageContext);

  const articleModal = useRef(null);
  const deleteModal = useRef(null);

  useEffect(() => {
    articleModal.current = new Modal('#articleModal', {
      backdrop: 'static',
      keyboard: true,
    });
    deleteModal.current = new Modal('#deleteModal', {
      keyboard: true,
    });

    getArticles();
  }, []);

  async function getArticles(page = 1) {
    setIsLoadingArticles(true);
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/articles?page=${page}`
      );
      console.log(res.data);
      setArticles(res.data.articles);
      setPagination(res.data.pagination);
      setIsLoadingArticles(false);
    } catch (error) {
      console.log(error);
      setIsLoadingArticles(false);
    }
  }

  async function getArticle(id) {
    setLoadingModal(true);
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/article/${id}`
      );
      console.log(res.data);
      setTempArticle(res.data.article);
      setLoadingModal(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteArticle(id) {
    const res = await axios.delete(
      `/v2/api/${process.env.REACT_APP_API_PATH}/admin/article/${id}`
    );
    console.log(res);
    alert(res.data.message);
    closeDeleteModal();
    getArticles(pagination.current_page);
  }

  function openArticleModal(type, id) {
    setType(type);
    getArticle(id);
    articleModal.current.show();
  }

  function closeArticleModal() {
    articleModal.current.hide();
    console.log('hide');
  }

  function openDeleteModal(article) {
    setTempArticle(article);
    deleteModal.current.show();
  }

  function closeDeleteModal() {
    deleteModal.current.hide();
  }

  // if (isLoadingArticles) {
  //   return (
  //     <main style={{ height: `calc(100% - 151px` }}>
  //       <FullPageLoader />
  //     </main>
  //   );
  // }

  return (
    <>
      <ArticleModal
        closeArticleModal={closeArticleModal}
        getArticles={getArticles}
        type={type}
        tempArticle={tempArticle}
        currentPage={pagination.current_page}
        showMessage={showMessage}
        isLoadingModal={isLoadingModal}
      />
      <DeleteModal
        closeDeleteModal={closeDeleteModal}
        // tempProduct={tempProduct}
        text={tempArticle.title}
        id={tempArticle.id}
        handleDelete={deleteArticle}
      />
      <Message type={messageType} message={message} />
      {isLoadingArticles ? (
        <main style={{ height: `calc(100% - 151px` }}>
          <FullPageLoader />
        </main>
      ) : (
        <main>
          <header className="d-flex align-items-center">
            <h1 className="fs-5">文章列表</h1>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm ms-2"
              onClick={() => openArticleModal('create', {})}
            >
              <i className="bi bi-plus-lg"></i> 新增文章
            </button>
          </header>
          <hr />

          <table className="table my-3">
            <thead>
              <tr>
                <th scope="col" width="40%">
                  文章標題
                </th>
                <th scope="col" width="15%">
                  建立日期
                </th>
                <th scope="col" width="10%">
                  作者
                </th>
                <th scope="col" width="15%">
                  標籤
                </th>
                <th scope="col" width="10%" className="text-center">
                  發布狀態
                </th>
                <th scope="col" width="10%" className="text-center">
                  編輯
                </th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => {
                return (
                  <tr key={article.id}>
                    <td>
                      <Link to={`/blog/${article.id}`}>{article.title}</Link>
                    </td>
                    <td className="text-start">
                      {(() => {
                        const date = new Date(article.create_at);

                        const options = {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        };

                        return date.toLocaleString('zh-TW', options);
                      })()}
                    </td>
                    <td>{article.author}</td>
                    <td>
                      <span className="badge rounded-pill px-1 bg-primary-subtle text-dark">
                        {article.tag[0]}
                      </span>
                    </td>
                    <td className="text-center">
                      {article.isPublic ? '已發布' : '未發布'}
                    </td>
                    <td className="text-center">
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => openArticleModal('edit', article.id)}
                      >
                        編輯
                      </button>
                      {/* <button
                    type="button"
                    className="btn btn-outline-danger btn-sm ms-1"
                    onClick={() => openDeleteModal(article)}
                  >
                    刪除
                  </button> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <footer className="d-flex justify-content-between align-items-end">
            <p className="ps-1">
              目前有 <span>{articles.length}</span> 篇文章
            </p>
            <Pagination pagination={pagination} changePage={getArticles} />
          </footer>
        </main>
      )}
    </>
  );
};

export default AdminProducts;
