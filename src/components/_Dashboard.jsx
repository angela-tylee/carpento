function Dashboard() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <p className="text-light mb-0">
            HEX EATS 後台管理系統
          </p>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <button type="button" className="btn btn-sm btn-light">
                  登出
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="d-flex" style={{ minHeight: 'calc(100vh - 56px)' }}>
        <div className="bg-light" style={{ width: '200px' }}>
          <ul className="list-group list-group-flush">
            <a className="list-group-item list-group-item-action py-3" to="/admin/products">
              <i className="bi bi-cup-fill me-2" />
              產品列表
            </a>
            <a className="list-group-item list-group-item-action py-3" to="/admin/coupons">
              <i className="bi bi-ticket-perforated-fill me-2" />
              優惠卷列表
            </a>
            <a className="list-group-item list-group-item-action py-3" to="/admin/orders">
              <i className="bi bi-receipt me-2" />
              訂單列表
            </a>
          </ul>
        </div>
        <div className="w-100">
          {/* Products */}
          <div className="p-3">
            <h3>產品列表</h3>
            <hr />
            <div className="text-end">
              <button
                type="button"
                className="btn btn-primary btn-sm"
              >
                建立新商品
              </button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">分類</th>
                  <th scope="col">名稱</th>
                  <th scope="col">售價</th>
                  <th scope="col">啟用狀態</th>
                  <th scope="col">編輯</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>分類</td>
                  <td>名稱</td>
                  <td>價格</td>
                  <td>啟用</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                    >
                      編輯
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm ms-2"
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link disabled" href="/" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                {
                [...new Array(5)].map((_, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <li className="page-item" key={`${i}_page`}>
                    <a
                      className={`page-link ${(i + 1 === 1) && 'active'}`}
                      href="/"
                    >
                      {i + 1}
                    </a>

                  </li>
                ))
              }
                <li className="page-item">
                  <a className="page-link" href="/" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          {/* Products end */}
        </div>
      </div>
    </>
  )
}

export default Dashboard;