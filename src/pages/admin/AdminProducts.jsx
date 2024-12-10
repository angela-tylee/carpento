import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ProductModal from '../../components/ProductModal';
import { Modal } from 'bootstrap';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [type, setType] = useState('create');
  const [tempProducts, setTempProducts] = useState({})

  const productModal = useRef(null);

  useEffect(() => {
    // const token = document.cookie // 取出 token
    //   .split('; ')
    //   .find((row) => row.startsWith('carpento='))
    //   ?.split('=')[1];

    // console.log(token);

    // axios.defaults.headers.common['Authorization'] = token;

    (async () => {
      const productRes = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/products/all`
      );
      console.log(productRes);
    })();

    productModal.current = new Modal('#productModal', {
      backdrop: 'static',
      keyboard: true,
    });

    getProducts();
  }, []);

  // TODO: Need to re-login after refreshing page. 2024-12-10
  async function getProducts() {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/admin/products`
    );
    console.log(res.data);
    setProducts(res.data.products);
    // setPagination(res.data.pagination);
  }

  function openProductModal() {
    productModal.current.show();
  }

  function closeProductModal() {
    productModal.current.hide();
    console.log('hide');
  }

  return (
    <main>
      <ProductModal
        closeProductModal={closeProductModal}
        getProducts={getProducts}
      />
      <header className="d-flex align-items-center">
        <h1 className="fs-5">產品列表</h1>
        <button
          type="button"
          className="btn btn-outline-primary btn-sm ms-2"
          onClick={openProductModal}
        >
          <i class="bi bi-plus-lg"></i> 新增產品
        </button>
      </header>
      <hr />

      <table className="table my-3">
        <thead>
          <tr>
            <th scope="col" width="15%">
              圖片
            </th>
            <th scope="col" width="45%">
              名稱
            </th>
            <th scope="col" width="10%">
              分類
            </th>
            <th scope="col" width="5%" className="text-end">
              售價
            </th>
            <th scope="col" width="5%" className="text-end">
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
                <td>product.image</td>
                <td>{product.title}</td>
                <td>
                  <span className="badge rounded-pill px-1 bg-primary-subtle text-dark">
                    {product.category}
                  </span>
                </td>
                <td className="text-end">{product.price}</td>
                <td className="text-end">{product.origin_price}</td>
                <td className="text-center">
                  {product.is_enabled ? '已啟用' : '未啟用'}
                </td>
                <td className="text-center">
                  <button type="button" className="btn btn-primary btn-sm">
                    編輯
                  </button>
                  {/* TODO: move 刪除 to ProductModal */}
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm ms-1"
                  >
                    刪除
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="ps-1">
        {/* TODO: 要計算所有頁面的產品數量，不只單頁 */}
        目前有 <span>{products.length}</span> 項產品
      </p>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end">
          <li className="page-item">
            <a className="page-link disabled" href="/" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link active" href="/">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="/">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="/">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="/">
              4
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="/">
              5
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="/" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </main>
  );
};

export default AdminProducts;
