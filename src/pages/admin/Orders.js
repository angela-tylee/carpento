const Order = ({ orders, selectedOrder }) => {
  return (
    <div className="row w-100">
      <div className="col-9">
        <h1 className="fs-5 mt-1">訂單列表</h1>
        <hr className="mb-4" />
        <div className="text-start">
          <button type="button" className="btn btn-primary btn-sm">
            新增產品
          </button>
        </div>
        <table className="table my-3">
          <thead>
            <tr>
              <th scope="col" width="2%">No</th>
              <th scope="col" width="10%">訂單編號</th>
              <th scope="col" width="12%">品項</th>
              <th scope="col" width="5%">金額</th>
              <th scope="col" width="5%">日期</th>
              <th scope="col" width="5%">付款狀態</th>
              <th scope="col" width="8%">編輯</th>
              <th scope="col" width="8%">查看訂單</th>
            </tr>
          </thead>
          <tbody>
          <tr>
            <td>1</td>
            <td>訂單編號</td>
            <td>名稱</td>
            <td>金額</td>
            <td>日期</td>
            <td>未付款</td>
            <td>
              <button type="button" className="btn btn-primary btn-sm">編輯</button>
              <button type="button" className="btn btn-outline-danger btn-sm">刪除</button>
            </td>
            <td>
              <button type="button" className="btn btn-primary btn-sm">查看訂單</button>
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
            {/* Pagination items can be dynamically generated based on total pages */}
            {[1, 2, 3, 4, 5].map((page) => (
              <li className="page-item" key={page}>
                <a className="page-link" href="/">{page}</a>
              </li>
            ))}
            <li className="page-item">
              <a className="page-link" href="/" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="col-3">
        <h2 className="fs-5 mt-1">訂單細節</h2>
        <hr className="mb-4" />
        {selectedOrder ? (
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title fs-6">
                訂單編號：{selectedOrder.orderNumber}
                <span className="badge text-bg-success">付款狀態：{selectedOrder.paymentStatus ? '已付款' : '未付款'}</span>
              </h5>
              <p>訂單日期：{selectedOrder.date}</p>
              <div className="d-flex">
                <img src={selectedOrder.itemImage} alt="item-image" className="me-2" />
                <p>品項 * 1</p>
              </div>
              <p>小計：{selectedOrder.subtotal}</p>
              <p>折扣碼：{selectedOrder.discountCode}</p>
              <p>總金額：{selectedOrder.totalAmount}</p>
              <hr />
              <p className="card-text">姓名：{selectedOrder.customerName}</p>
              <p className="card-text">電子郵件：{selectedOrder.email}</p>
              <p className="card-text">電話：{selectedOrder.phone}</p>
              <p className="card-text">地址：{selectedOrder.address}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray">請選擇一個訂單查看</p>
        )}
      </div>
    </div>
  );
};

export default Order;
