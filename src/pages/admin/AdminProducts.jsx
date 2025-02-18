import { useEffect, useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductModal from '../../components/ProductModal';
import DeleteModal from '../../components/DeleteModal';
import { Modal } from 'bootstrap';
import Pagination from '../../components/Pagination';
import Message from '../../components/Message';
import { MessageContext } from '../../context/MessageContext';
import FullPageLoader from '../../components/FullPageLoader';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [type, setType] = useState('create');
  const [tempProduct, setTempProduct] = useState({});
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const { message, messageType, showMessage } = useContext(MessageContext);

  const productModal = useRef(null);
  const deleteModal = useRef(null);

  useEffect(() => {
    productModal.current = new Modal('#productModal', {
      backdrop: 'static',
      keyboard: true,
    });
    
    deleteModal.current = new Modal('#deleteModal', {
      keyboard: true,
    });

    const produceModalElement = document.getElementById("productModal");

    produceModalElement.addEventListener('hide.bs.modal', () => {
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

    getProducts();
    getProductsAll();
  }, []);

  const getProducts = async (page = pagination.current_page) => {
    setIsLoadingProducts(true);
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/products?page=${page}`
      );
      setProducts(res.data.products);
      setPagination(res.data.pagination);
      setIsLoadingProducts(false);
    } catch (error) {
      setIsLoadingProducts(false);
    }
  };

  const getProductsAll = async () => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
    );

    setAllProducts(res.data.products);
  };

  const deleteProduct = async (id) => {
    setIsLoadingDelete(true);
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${id}`
      );
      setIsLoadingDelete(false);
      showMessage('success', `成功：${res.data.message}`);
      closeDeleteModal();
      getProducts(pagination.current_page);
    } catch (error) {
      setIsLoadingDelete(false);
      showMessage('danger', `失敗：${error.response.data.message}`);
      closeDeleteModal();
    }
  };

  function openProductModal(type, product) {
    setTempProduct(product);
    setType(type);
    productModal.current.show();
  }

  function closeProductModal() {
    productModal.current.hide();
  }

  function closeDeleteModal() {
    deleteModal.current.hide();
  }

  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = allProducts.filter((product) => {
    return product.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <ProductModal
        closeProductModal={closeProductModal}
        getProducts={getProducts}
        type={type}
        tempProduct={tempProduct}
        currentPage={pagination.current_page}
        showMessage={showMessage}
      />
      <DeleteModal
        closeDeleteModal={closeDeleteModal}
        text={tempProduct.title}
        id={tempProduct.id}
        handleDelete={deleteProduct}
        isLoadingDelete={isLoadingDelete}
      />
      {/* <Message type={messageType} message={message} /> */}
      {isLoadingProducts ? (
        <main style={{ height: `calc(100% - 151px` }}>
          <FullPageLoader />
        </main>
      ) : (
        <main>
          <header className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <h1 className="fs-5">產品列表</h1>
              <button
                type="button"
                className="btn btn-outline-primary btn-sm ms-2"
                onClick={() => openProductModal('create', {})}
              >
                <i className="bi bi-plus-lg"></i> 新增產品
              </button>
            </div>
            <div className="search-container d-flex align-items-center border border-dark rounded-pill overflow-hidden py-1 px-3">
              <input
                className="form-control p-0 border-0 shadow-none"
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
              <button className="btn btn-none border-0">
                <i className="icon-search bi bi-search px-1"></i>
              </button>
            </div>
          </header>
          <hr />

          <table className="table my-3">
            <thead>
              <tr>
                <th scope="col" width="10%">
                  圖片
                </th>
                <th scope="col" width="30%">
                  產品名稱
                </th>
                <th scope="col" width="10%">
                  分類
                </th>
                <th scope="col" width="10%" className="text-end">
                  售價
                </th>
                <th scope="col" width="10%" className="text-end">
                  原價
                </th>
                <th scope="col" width="10%" className="text-center">
                  標籤
                </th>
                <th scope="col" width="10%" className="text-center">
                  啟用狀態
                </th>
                <th scope="col" width="15%" className="text-center">
                  編輯
                </th>
              </tr>
            </thead>
            <tbody>
              {(searchTerm ? filteredProducts : products)?.map((product) => {
                return (
                  <tr key={product.id}>
                    <td>
                      <img
                        src={product.imagesUrl[0] || ''}
                        alt={product.title}
                        width="100%"
                      />
                    </td>
                    <td>
                      <Link to={`/product/${product.id}`}>{product.title}</Link>
                    </td>
                    <td>
                      <span className="badge rounded-pill px-1 bg-primary-subtle text-dark">
                        {product.category}
                      </span>
                    </td>

                    <td className="text-end">
                      {product.price.toLocaleString()}
                    </td>
                    <td className="text-end">
                      {product.origin_price.toLocaleString()}
                    </td>
                    <td className="text-center">
                      <span
                        className={`badge rounded-pill px-1 ${
                          product.tag === 'sale' || product.tag === 'hot'
                            ? 'bg-danger-subtle'
                            : product.tag === 'new'
                            ? 'bg-warning-subtle'
                            : ''
                        } text-dark`}
                      >
                        {product.tag || ''}
                      </span>
                    </td>
                    <td className="text-center">
                      {product.is_enabled ? '已啟用' : '未啟用'}
                    </td>
                    <td className="text-center">
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => openProductModal('edit', product)}
                      >
                        編輯
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <footer className="d-flex justify-content-between align-items-end">
            <p className="ps-1">
              目前有
              <span>
                {filteredProducts
                  ? filteredProducts.length
                  : allProducts.length}
              </span>
              項產品
            </p>
            {searchTerm === '' && (
              <Pagination
                pagination={pagination}
                paginationTotal={pagination.total_pages}
                changePage={getProducts}
              />
            )}
          </footer>
        </main>
      )}
    </>
  );
};

export default AdminProducts;
