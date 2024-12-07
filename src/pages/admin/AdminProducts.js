import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductModal from "../../components/ProductModal";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products/all`);
      setProducts(res.data.products);
      setPagination(res.data.pagination);
    })()
  })

  return (
    <main>
      <ProductModal />
      <h1 className="fs-5 mt-1">產品列表</h1>
      <hr />
      <div className="text-start mt-4">
        <button type="button" className="btn btn-primary btn-sm">
          新增產品
        </button>
      </div>
      <table className="table my-3">
        <thead>  
          <tr>
            <th scope="col" width="10%">分類</th>
            <th scope="col" width="15%">圖片</th>
            <th scope="col" width="20%">名稱</th>
            <th scope="col" width="10%">原價</th>
            <th scope="col" width="10%">售價</th>
            <th scope="col" width="10%">啟用狀態</th>
            <th scope="col" width="15%">編輯</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.category}</td>
                <td>product.image</td>
                <td>{product.title}</td>
                <td>{product.origin_price}</td>
                <td>{product.price}</td>
                <td>{product.is_enabled ? '已啟用': '未啟用'}</td>
                <td>
                  <button type="button" className="btn btn-primary btn-sm">編輯</button>
                  <button type="button" className="btn btn-outline-danger btn-sm">刪除</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <p className="ps-1">目前有 <span>{products.length}</span> 項產品</p>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end">
          <li className="page-item">
            <a className="page-link disabled" href="/" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link active" href="/">1</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="/">2</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="/">3</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="/">4</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="/">5</a>
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
