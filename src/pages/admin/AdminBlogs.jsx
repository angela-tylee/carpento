import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
// import ProductModal from '../../components/ProductModal';
import ArticleModal from '../../components/ArticleModal';
import DeleteModal from '../../components/DeleteModal';
import { Modal } from 'bootstrap';
import Pagination from '../../components/Pagination';

const AdminProducts = () => {
  // const [products, setProducts] = useState([]);
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({});
  const [type, setType] = useState('create');
  // const [tempProduct, setTempProduct] = useState({});
  const [tempArticle, setTempArticle] = useState({});

  const productModal = useRef(null);
  const articleModal = useRef(null);
  const deleteModal = useRef(null);

  useEffect(() => {
    // productModal.current = new Modal('#productModal', {
    //   backdrop: 'static',
    //   keyboard: true,
    // });
    articleModal.current = new Modal('#articleModal', {
      backdrop: 'static',
      keyboard: true,
    });
    deleteModal.current = new Modal('#deleteModal', {
      keyboard: true,
    });

    // getProducts();

    getArticles();
  }, []);

  async function getArticles( page = 1) {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/admin/articles?page=${page}`
    );
    console.log(res.data);
    setArticles(res.data.articles);
    setPagination(res.data.pagination);
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

  function openArticleModal(type, article) {
    setType(type);
    setTempArticle(article);
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

  return (
    <main>
      <ArticleModal
        closeArticleModal={closeArticleModal}
        // getProducts={getProducts}
        getArticles={getArticles}
        type={type}
        // tempProduct={tempProduct}
        tempArticle={tempArticle}
      />
      <DeleteModal
        closeDeleteModal={closeDeleteModal}
        // tempProduct={tempProduct}
        text={tempArticle.title}
        id={tempArticle.id}
        handleDelete={deleteArticle}
      />
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
            {/* TODO: Add link to go to front page */}
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
                <td>{article.title}</td>
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
                  {article.isPublic ? '已發布' : '未發布'}
                </td>
                <td className="text-center">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => openArticleModal('edit', article)}
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
          {/* TODO: 要計算所有頁面的產品數量，不只單頁 */}
          目前有 <span>{articles.length}</span> 篇文章
        </p>
        <Pagination pagination={pagination} changePage={getArticles}/>
      </footer>
    </main>
  );
};

export default AdminProducts;
