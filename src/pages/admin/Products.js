const Products = () => {
  return (
    <main>
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
            <th scope="col" width="10%">圖片</th>
            <th scope="col" width="15%">名稱</th>
            <th scope="col" width="8%">原價</th>
            <th scope="col" width="8%">售價</th>
            <th scope="col" width="8%">啟用狀態</th>
            <th scope="col" width="8%">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>分類</td>
            <td>圖片</td>
            <td>名稱</td>
            <td>價格</td>
            <td>價格</td>
            <td>啟用</td>
            <td>
              <button type="button" className="btn btn-primary btn-sm">編輯</button>
              <button type="button" className="btn btn-outline-danger btn-sm">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p className="ps-1">目前有 <span></span> 項產品</p>
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

export default Products;
