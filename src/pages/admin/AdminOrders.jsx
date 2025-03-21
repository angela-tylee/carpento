import { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import OrderModal from '../../components/OrderModal';
import DeleteModal from '../../components/DeleteModal';
import { Modal } from 'bootstrap';
import Pagination from '../../components/Pagination';
import FullPageLoader from '../../components/FullPageLoader';
import { MessageContext } from '../../context/MessageContext';

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const { showMessage } = useContext(MessageContext);

  const orderModal = useRef(null);
  const deleteModal = useRef(null);

  useEffect(() => {
    orderModal.current = new Modal('#orderModal', {
      backdrop: 'static',
      keyboard: true,
    });

    deleteModal.current = new Modal('#deleteModal', {
      keyboard: true,
    });

    const orderModalElement = document.getElementById('orderModal');

    orderModalElement.addEventListener('hide.bs.modal', () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    });

    const deleteModalElement = document.getElementById('deleteModal');

    deleteModalElement.addEventListener('hide.bs.modal', () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    });

    getOrders();
  }, []);

  const getOrders = async (page = pagination.current_page) => {
    setIsLoadingOrders(true);
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/orders?page=${page}`
      );
      setOrders(res.data.orders);
      setPagination(res.data.pagination);
      setIsLoadingOrders(false);
    } catch (error) {
      setIsLoadingOrders(false);
    }
  };
  const deleteOrder = async (id) => {
    setIsLoadingDelete(true);
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${id}`
      );
      setIsLoadingDelete(false);
      // showMessage('success', `成功：${res.data.message}`);
      showMessage('success', `Success: ${res.data.message}`);
      closeDeleteModal();
      getOrders(pagination.current_page);
    } catch (error) {
      setIsLoadingDelete(false);
      // showMessage('danger', `失敗：${error.response.data.message}`);
      showMessage('danger', `Error: ${error.response.data.message}`);
      closeDeleteModal();
    }
  };

  function openOrderModal(order) {
    orderModal.current.show();
  }

  function closeOrderModal() {
    orderModal.current.hide();
  }

  function closeDeleteModal() {
    deleteModal.current.hide();
  }

  return (
    <>
      <OrderModal
        closeOrderModal={closeOrderModal}
        getOrders={getOrders}
        selectedOrder={selectedOrder}
        closeDeleteModal={closeDeleteModal}
        currentPate={pagination.current_page}
        showMessage={showMessage}
      />
      <DeleteModal
        closeDeleteModal={closeDeleteModal}
        text={selectedOrder?.id}
        id={selectedOrder?.id}
        handleDelete={deleteOrder}
        isLoadingDelete={isLoadingDelete}
      />
      {isLoadingOrders ? (
        <main style={{ height: `calc(100% - 151px` }}>
          <FullPageLoader />
        </main>
      ) : (
        <main className="row w-100">
          <div className="col-9">
            {/* <h1 className="fs-5 mt-1">訂單列表</h1> */}
            <h1 className="fs-5 mt-1">Orders</h1>
            <hr className="mb-4" />
            <table className="table my-3">
              <thead>
                <tr>
                  <th scope="col" width="25%">
                    {/* 訂單編號 */}
                    Order ID
                  </th>
                  <th scope="col" width="35%">
                    {/* 品項 */}
                    Items
                  </th>
                  <th scope="col" width="8%">
                    {/* 姓名 */}
                    Name
                  </th>
                  <th scope="col" width="9%" className="text-end">
                    {/* 金額 */}
                    Price
                  </th>
                  <th scope="col" width="13%">
                    {/* 訂單日期 */}
                    Order Date
                  </th>
                  <th scope="col" width="8%" className="text-center">
                    {/* 付款狀態 */}
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order.id}>
                    <td>
                      <div className="d-flex justify-content-between">
                        <span>{order.id}</span>
                        <button
                          type="button"
                          className="btn text-bg-secondary text-dark btn-sm rounded-pill fs-7 ms-1"
                          onClick={() => setSelectedOrder(order)}
                        >
                          {/* 查看 */}
                          view
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
                    <td>{order.user.name}</td>
                    <td className="text-end">
                      ${order.total?.toLocaleString()}
                    </td>
                    <td>
                      {(() => {
                        const date = new Date(order.create_at * 1000);

                        const options = {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        };

                        // return date.toLocaleString('zh-TW', options);
                        return date.toLocaleString('en-US', options);
                      })()}
                    </td>
                    <td className="text-center">
                      <span
                        className={
                          order.is_paid ? 'text-success' : 'text-danger'
                        }
                      >
                        {/* {order.is_paid ? '已付款' : '未付款'} */}
                        {order.is_paid ? 'Paid' : 'Unpaid'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <footer className="d-flex justify-content-between align-items-end">
              <p className="ps-1">
                {/* 目前有 <span>{orders.length}</span> 筆訂單 */}
                Total <span>{orders.length}</span> orders
              </p>
              <Pagination pagination={pagination} changePage={getOrders} />
            </footer>
          </div>
          <div className="col-3">
            {/* <h2 className="fs-5 mt-1">訂單細節</h2> */}
            <h2 className="fs-5 mt-1">Order Details</h2>
            <hr className="mb-4" />
            {selectedOrder ? (
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title fs-6">
                    {/* 訂單編號：{selectedOrder.id} */}
                    Order ID: {selectedOrder.id}
                  </h5>
                  <p>
                    {/* 訂單日期： */}
                    Order Date:{' '}
                    {(() => {
                      const date = new Date(selectedOrder.create_at * 1000);

                      const options = {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      };

                      // return date.toLocaleString('zh-TW', options);
                      return date.toLocaleString('us-EN', options);
                    })()}
                  </p>
                  <div className="mt-2">
                    {Object.entries(selectedOrder.products).map(
                      ([key, product]) => (
                        <div className="d-flex mb-1" key={key}>
                          <img
                            src={product.product.imagesUrl[0]}
                            alt={product.product.title}
                            className="me-2 w-25"
                          />
                          <p>
                            {product.product.title} * {product.qty}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                  <div className="mt-2">
                    <p>
                      {/* 小計：$ */}
                      Total: $
                      {Object.values(selectedOrder.products)
                        ?.reduce((total, product) => total + product.total, 0)
                        ?.toLocaleString()}
                    </p>
                    <p>
                      {/* 折扣碼： */}
                      Discount:{' '}
                      {/* {Object.values(selectedOrder.products)[0]?.coupon?.code ||
                        '無'} */}
                      {Object.values(selectedOrder.products)[0]?.coupon?.code ||
                        'none'}
                    </p>
                    <p>
                      {/* 總金額：${selectedOrder?.total?.toLocaleString()}{' '} */}
                      Final Total：${selectedOrder?.total?.toLocaleString()}{' '}
                      <span
                        className={`badge rounded-pill text-light ${
                          selectedOrder.is_paid
                            ? 'text-bg-success'
                            : 'text-bg-danger'
                        }`}
                      >
                        {/* {selectedOrder.is_paid ? '已付款' : '未付款'} */}
                        {selectedOrder.is_paid ? 'Paid' : 'Unpaid'}
                      </span>
                    </p>
                  </div>
                  <hr />
                  <div>
                    {/* <p className="card-text">姓名：{selectedOrder.user.name}</p> */}
                    <p className="card-text">Name: {selectedOrder.user.name}</p>
                    {/* <p className="card-text">
                      電子郵件：{selectedOrder.user.email}
                    </p> */}
                    <p className="card-text">
                      Email: {selectedOrder.user.email}
                    </p>
                    {/* <p className="card-text">電話：{selectedOrder.user.tel}</p> */}
                    <p className="card-text">
                      Phone Number: {selectedOrder.user.tel}
                    </p>
                    {/* <p className="card-text">
                      地址：{selectedOrder.user.address}
                    </p> */}
                    <p className="card-text">
                      Shipping Address:<br />{selectedOrder.user.address}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm mt-4 w-100"
                    onClick={() => openOrderModal(selectedOrder)}
                  >
                    {/* 編輯 */}
                    Edit
                  </button>
                </div>
              </div>
            ) : (
              // <p className="text-gray">請選擇一個訂單查看</p>
              <p className="text-gray">Select an order to view details.</p>
            )}
          </div>
        </main>
      )}
    </>
  );
};

export default AdminOrder;
