import { useEffect, useState, useRef, useContext } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import ArticleModal from '../../components/ArticleModal';
import DeleteModal from '../../components/DeleteModal';
import { Modal } from 'bootstrap';
import Pagination from '../../components/Pagination';
import { MessageContext } from '../../context/MessageContext';
import FullPageLoader from '../../components/FullPageLoader';

const AdminProducts = () => {
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({});
  const [type, setType] = useState('create');
  const [tempArticle, setTempArticle] = useState({});
  const [isLoadingModal, setLoadingModal] = useState(false);
  const [isLoadingArticles, setIsLoadingArticles] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const { showMessage } = useContext(MessageContext);

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

    const articleModalElement = document.getElementById("articleModal");

    articleModalElement.addEventListener('hide.bs.modal', () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    });

    const deleteModalElement = document.getElementById("deleteModal");

    deleteModalElement.addEventListener('hide.bs.modal', () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    });

    getArticles();
  }, []);

  const getArticles = async (page = 1) => {
    setIsLoadingArticles(true);
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/articles?page=${page}`
      );
      setArticles(res.data.articles);
      setPagination(res.data.pagination);
      setIsLoadingArticles(false);
    } catch (error) {
      setIsLoadingArticles(false);
    }
  };

  const getArticle = async (id) => {
    setLoadingModal(true);
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/article/${id}`
      );
      setTempArticle(res.data.article);
      setLoadingModal(false);
    } catch (error) {
      setLoadingModal(false);
    }
  };

  const deleteArticle = async (id) => {
    setIsLoadingDelete(true);
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/article/${id}`
      );
      setIsLoadingDelete(false);
      showMessage('success', `Success: ${res.data.message}`);
      closeDeleteModal();
      getArticles(pagination.current_page);
    } catch (error) {
      setIsLoadingDelete(false);
      showMessage('danger', `Error: ${error.response.data.message}`);
      closeDeleteModal();
    }
  };

  function openArticleModal(type, id) {
    setType(type);
    getArticle(id);
    articleModal.current.show();
  }

  function closeArticleModal() {
    articleModal.current.hide();
  }

  function closeDeleteModal() {
    deleteModal.current.hide();
  }

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
        text={tempArticle.title}
        id={tempArticle.id}
        handleDelete={deleteArticle}
        isLoadingDelete={isLoadingDelete}
      />
      {isLoadingArticles ? (
        <main style={{ height: `calc(100% - 151px` }}>
          <FullPageLoader />
        </main>
      ) : (
        <main>
          <header className="d-flex align-items-center">
            <h1 className="fs-5">Articles</h1>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm ms-2"
              onClick={() => openArticleModal('create', {})}
            >
              <i className="bi bi-plus-lg"></i> Add Article
            </button>
          </header>
          <hr />

          <table className="table my-3">
            <thead>
              <tr>
                <th scope="col" width="40%">
                  Title
                </th>
                <th scope="col" width="15%">
                  Create Date
                </th>
                <th scope="col" width="10%">
                  Author
                </th>
                <th scope="col" width="15%">
                  Tags
                </th>
                <th scope="col" width="10%" className="text-center">
                </th>
                <th scope="col" width="10%" className="text-center">
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

                        return date.toLocaleString('en-US', options);
                      })()}
                    </td>
                    <td>{article.author}</td>
                    <td>
                      <span className="badge rounded-pill px-1 bg-primary-subtle text-dark">
                        {article.tag[0]}
                      </span>
                    </td>
                    <td className="text-center">
                      {article.isPublic ? (
                        <span>published</span>
                      ) : (
                        <span className="text-body-tertiary">disabled</span>
                      )}
                    </td>
                    <td className="text-center">
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => openArticleModal('edit', article.id)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <footer className="d-flex justify-content-between align-items-end">
            <p className="ps-1">
              Total <span>{articles.length}</span> articles
            </p>
            <Pagination pagination={pagination} changePage={getArticles} />
          </footer>
        </main>
      )}
    </>
  );
};

export default AdminProducts;
