import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ProductModal from '../../components/ProductModal';
import DeleteModal from '../../components/DeleteModal';
import { Modal } from 'bootstrap';
import Pagination from '../../components/Pagination';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [type, setType] = useState('create');
  const [tempProduct, setTempProduct] = useState({});

  // QUESTION: useRef()? 2024-12-16
  const productModal = useRef(null);
  const deleteModal = useRef(null);

  useEffect(() => {
    // const token = document.cookie // 取出 token
    //   .split('; ')
    //   .find((row) => row.startsWith('carpento='))
    //   ?.split('=')[1];

    // console.log(token);

    // axios.defaults.headers.common['Authorization'] = token;

    // QUESTION: 為什麼 React 立即函式特別多？ 2024-12-11
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
  }, []);

  // FIXED: Need to re-login after refreshing page. 2024-12-10 -> Add to AdminRoutes page 2024-12-11? 
  async function getProducts(page) {
    // TODO: Remove pagination?
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/admin/products?page=${page}`
    );
    console.log(res.data);
    setProducts(res.data.products);
    setPagination(res.data.pagination);
  }

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
    setType(type);
    setTempProduct(product);
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

  return (
    <main>
      <ProductModal
        closeProductModal={closeProductModal}
        getProducts={getProducts}
        type={type}
        tempProduct={tempProduct}
        // FIXME: put API 後 getProduct() 刷新又回到第一頁
        currentPate={pagination.current_page}
      />
      <DeleteModal 
        closeDeleteModal={closeDeleteModal}
        text={tempProduct.title}
        id={tempProduct.id}
        handleDelete={deleteProduct}
      />
      <header className="d-flex align-items-center">
        <h1 className="fs-5">產品列表</h1>
        <button
          type="button"
          className="btn btn-outline-primary btn-sm ms-2"
          // QUESTION: Why an arrow function wrapper needed to pass that parameter? (It is the same logic in Vanilla JS, but not in Vue.)
          onClick={() => openProductModal('create', {})}
        >
          <i className="bi bi-plus-lg"></i> 新增產品
        </button>
      </header>
      <hr />

      <table className="table my-3">
        <thead>
          <tr>
            {/* TODO: Add link to go to front page */}
            <th scope="col" width="10%">
              圖片
            </th>
            <th scope="col" width="40%">
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
              啟用狀態
            </th>
            <th scope="col" width="15%" className="text-center">
              編輯
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <td><img src={product.imageUrl} alt={product.title} width="100%"/></td>
                <td>{product.title}</td>
                <td>
                  <span className="badge rounded-pill px-1 bg-primary-subtle text-dark">
                    {product.category}
                  </span>
                </td>
                <td className="text-end">{product.price.toLocaleString()}</td>
                <td className="text-end">{product.origin_price.toLocaleString()}</td>
                <td className="text-center">
                  {product.is_enabled ? '已啟用' : '未啟用'}
                </td>
                <td className="text-center">
                  <button type="button" className="btn btn-primary btn-sm"
                  onClick={() => openProductModal('edit', product)}>
                    編輯
                  </button>
                  {/* TODO: move 刪除 button to ProductModal */}
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
          目前有 <span>{products.length}</span> 項產品
        </p>
        <Pagination pagination={pagination} changePage={getProducts}/>
      </footer>
    </main>
  );
};

export default AdminProducts;
