import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import OrderModal from '../../components/OrderModal';
import DeleteModal from '../../components/DeleteModal';
import { Modal } from 'bootstrap';

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  // const [type, setType] = useState('edit');
  // const [tempProduct, setTempProduct] = useState({});

  const orderModal = useRef(null);
  const deleteModal = useRef(null);

  const getOrders = async () => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/admin/orders`
    );
    console.log(res);
    setOrders(res.data.orders);
  };

  useEffect(() => {
    orderModal.current = new Modal('#orderModal', {
      backdrop: 'static',
      keyboard: true,
    });
    deleteModal.current = new Modal('#deleteModal', {
      keyboard: true,
    });
    getOrders();
  }, []);

  function openOrderModal(order) {
    // setType(type);
    // setTempProduct(product);
    orderModal.current.show();
  }

  function closeOrderModal() {
    orderModal.current.hide();
    console.log('hide');
  }

  function openDeleteModal(product) {
    // setTempProduct(product);
    deleteModal.current.show();
  }

  function closeDeleteModal() {
    deleteModal.current.hide();
  }

  return (
    <div className="row w-100">
      <OrderModal
        closeOrderModal={closeOrderModal}
        getOrders={getOrders}
        // type={type}
        selectedOrder={selectedOrder}
        // tempProduct={tempProduct}
        closeDeleteModal={closeDeleteModal} 
      />
      <DeleteModal 
        // tempProduct={tempProduct}
        openDeleteModal={openDeleteModal}
      />
      <div className="col-9">
        <h1 className="fs-5 mt-1">訂單列表</h1>
        <hr className="mb-4" />
        <table className="table my-3">
          <thead>
            <tr>
              <th scope="col" width="2%">
                No
              </th>
              <th scope="col" width="25%">
                訂單編號
              </th>
              <th scope="col" width="40%">
                品項
              </th>
              <th scope="col" width="10%" className="text-end">
                金額
              </th>
              <th scope="col" width="13%">
                日期
              </th>
              <th scope="col" width="10%" className="text-center">
                付款狀態
              </th>
              {/* <th scope="col" width="6%" className="text-center">
                編輯
              </th> */}
              {/* <th scope="col" width="5%">
                查看訂單
              </th> */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>
                  <div className="d-flex justify-content-between">
                    <span>{order.id}</span>
                    <button
                      type="button"
                      className="btn text-bg-secondary btn-sm rounded-pill fs-7 ms-1"
                      onClick={() => setSelectedOrder(order)}
                    >
                      查看
                    </button>
                  </div>
                </td>
                <td>
                  {Object.entries(order.products).map(([key, product]) => (
                    <div key={key}>
                      <span>
                        {product.product.title} x{product.qty}
                      </span>
                    </div>
                  ))}
                </td>
                <td className="text-end">${order.total?.toLocaleString()}</td>
                <td>
                  {/* TODO: Date is wrong, 1970 */}
                  {(() => {
                    const date = new Date(order.create_at);

                    const options = {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    };

                    return date.toLocaleString('en-US', options);
                  })()}
                </td>
                <td className="text-center">
                  <span className={order.is_paid ? 'text-success' : 'text-danger'}>
                    {order.is_paid ? '已付款' : '未付款'}
                    </span>
                </td>
                {/* <td className="text-center">
                  <button type="button" className="btn btn-primary btn-sm">
                    編輯
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                  >
                    刪除
                  </button>
                </td> */}
                {/* <td>
                  <button type="button" className="btn btn-primary btn-sm" onClick={() => setSelectedOrder(order)}>
                    查看訂單
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="ps-1">
          目前有 <span>{orders.length}</span> 筆訂單
        </p>
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
                <a className="page-link" href="/">
                  {page}
                </a>
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
              <h5 className="card-title fs-6">訂單編號：{selectedOrder.id}</h5>
              <p>訂單日期：{selectedOrder.create_at}</p>
              <div className="mt-2">
                {Object.entries(selectedOrder.products).map(([key, product]) => (
                  <div className="d-flex">
                    <img
                      key={key}
                      src={product.product.imageUrl}
                      alt={product.product.title}
                      className="me-2 w-25"
                    />
                    <p>
                      {product.product.title} * {product.qty}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <p>小計：${selectedOrder?.total?.toLocaleString()}</p>
                {/* TODO: coupon */}
                <p>折扣碼：{selectedOrder.coupon}</p>
                <p>
                  總金額：${selectedOrder?.total?.toLocaleString()}{' '}
                  <span
                    className={`badge rounded-pill text-light ${
                      selectedOrder.is_paid ? 'text-bg-success' : 'text-bg-danger'
                    }`}
                  >
                    {selectedOrder.is_paid ? '已付款' : '未付款'}
                  </span>
                </p>
              </div>
              <hr />
              <div>
                <p className="card-text">姓名：{selectedOrder.user.name}</p>
                <p className="card-text">電子郵件：{selectedOrder.user.email}</p>
                <p className="card-text">電話：{selectedOrder.user.tel}</p>
                <p className="card-text">地址：{selectedOrder.user.address}</p>
              </div>
              <button type="button" className="btn btn-outline-primary btn-sm mt-4 w-100" onClick={() => openOrderModal(selectedOrder)}>  
                編輯
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray">請選擇一個訂單查看</p>
        )}
      </div>
    </div>
  );
};

export default AdminOrder;
