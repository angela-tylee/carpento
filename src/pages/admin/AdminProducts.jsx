import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductModal from '../../components/ProductModal';
import DeleteModal from '../../components/DeleteModal';
import { Modal } from 'bootstrap';
import Pagination from '../../components/Pagination';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [type, setType] = useState('create');
  const [tempProduct, setTempProduct] = useState({});
  // const [isLoadingModal, setLoadingModal] = useState(false);

  const productModal = useRef(null);
  const deleteModal = useRef(null);

  useEffect(() => {
    // const token = document.cookie // 取出 token
    //   .split('; ')
    //   .find((row) => row.startsWith('carpento='))
    //   ?.split('=')[1];

    // console.log(token);

    // axios.defaults.headers.common['Authorization'] = token;

    // (async () => {
    //   const productRes = await axios.get(
    //     `/v2/api/${process.env.REACT_APP_API_PATH}/admin/products/all`
    //   );
    //   console.log(productRes);
    // })();

    productModal.current = new Modal('#productModal', {
      backdrop: 'static',
      keyboard: true,
    });
    deleteModal.current = new Modal('#deleteModal', {
      keyboard: true,
    });

    getProducts();
    getProductsAll();
  }, []);

  // FIXED: Need to re-login after refreshing page. 2024-12-10 -> Add to AdminRoutes page 2024-12-11?
  async function getProducts(page = pagination.current_page) {
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/products?page=${page}`
      );
      console.log(res.data);
      setProducts(res.data.products);
      setPagination(res.data.pagination);
    } catch (error) {
      console.log(error);
    }
  }

  const getProductsAll = async () => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
    );

    console.log('allProducts', res);

    setAllProducts(res.data.products);
  };

  async function deleteProduct(id) {
    const res = await axios.delete(
      `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${id}`
    );
    console.log(res);
    alert(res.data.message);
    // console.log('delete', id);
    closeDeleteModal();
    getProducts(pagination.current_page);
  }

  function openProductModal(type, product) {
    setTempProduct(product);
    setType(type);
    productModal.current.show();
  }

  function closeProductModal() {
    productModal.current.hide();
    console.log('hide');
  }

  function openDeleteModal(product) {
    setTempProduct(product);
    deleteModal.current.show();
  }

  function closeDeleteModal() {
    deleteModal.current.hide();
  }

  // TODO: search filter 元件化 'useFilter'
  const [searchTerm, setSearchTerm] = useState('');
  // const [filteredProducts, setFilteredProducts] = useState([]);

  const filteredProducts = allProducts.filter((product) => {
    return product.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // console.log(filteredProducts);

  const handleFilter = (e) => {
  // FIXME: 清空 searchTerm 時，頁碼要恢復正常
    setPagination({ ...pagination, total_pages: 1, current_page: 1 });
    e.preventDefault();
  };

  return (
    <main>
      <ProductModal
        closeProductModal={closeProductModal}
        getProducts={getProducts}
        type={type}
        tempProduct={tempProduct}
        currentPate={pagination.current_page}
        // isLoadingModal={isLoadingModal}
      />
      <DeleteModal
        closeDeleteModal={closeDeleteModal}
        text={tempProduct.title}
        id={tempProduct.id}
        handleDelete={deleteProduct}
      />
      <header className="d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <h1 className="fs-5">產品列表</h1>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm ms-2"
            // QUESTION: Why an arrow function wrapper needed to pass that parameter? (It is the same logic in Vanilla JS, but not in Vue.)
            onClick={() => openProductModal('create', {})}
          >
            <i className="bi bi-plus-lg"></i> 新增產品
          </button>
        </div>
        <form onSubmit={handleFilter} className="search-container d-flex align-items-center border border-dark rounded-pill overflow-hidden py-1 px-3">
          {/* TODO: 輸入產品文字太長時，會破版 */}
          {/* <form onSubmit={handleFilter}> */}
            <input
              className="form-control p-0 border-0 shadow-none"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              // onFocus={() => setShowSuggestions(true)}
              // onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            <button
              className="btn btn-none border-0"
              // onClick={handleFilter}
            >
              <i className="icon-search bi bi-search px-1"></i>
            </button>
          {/* </form> */}
        </form>
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
          {/* FIXME: "Fern & Succulent Artificial Plant" 產品不存在 */}
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

                <td className="text-end">{product.price.toLocaleString()}</td>
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
                  {/* <button
                    type="button"
                    className="btn btn-outline-danger btn-sm ms-1"
                    onClick={() => openDeleteModal(product)}
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
          目前有 <span>{filteredProducts ? filteredProducts.length : allProducts.length}</span> 項產品
        </p>
        <Pagination
          pagination={pagination}
          paginationTotal={pagination.total_pages}
          changePage={getProducts}
        />
      </footer>
    </main>
  );
};

export default AdminProducts;
