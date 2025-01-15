import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import OrderModal from '../../components/OrderModal';
import DeleteModal from '../../components/DeleteModal';
import { Modal } from 'bootstrap';
import Pagination from '../../components/Pagination';
import FullPageLoader from '../../components/FullPageLoader';

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);

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
    getOrders();
  }, []);

  const getOrders = async (page = 1) => {
    setIsLoadingOrders(true);
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/orders?page=${page}`
      );
      console.log(res);
      setOrders(res.data.orders);
      setPagination(res.data.pagination);
      setIsLoadingOrders(false);
    } catch (error) {
      console.log(error);
      setIsLoadingOrders(false);
    }
  };
  async function deleteOrder(id) {
    const res = await axios.delete(
      `/v2/api/${process.env.REACT_APP_API_PATH}/admin/order/${id}`
    );
    console.log('delete', id);
    console.log(res);
    alert(res.data.message);
    closeDeleteModal();
    getOrders(pagination.current_page);
  }

  function openOrderModal(order) {
    // setType(type);
    // setTempProduct(product);
    console.log(order);
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

  // if (isLoadingOrders) {
  //   return (
  //     <main style={{ height: `calc(100% - 151px` }}>
  //       <FullPageLoader />
  //     </main>
  //   );
  // }

  return (
    <>
      <OrderModal
        closeOrderModal={closeOrderModal}
        getOrders={getOrders}
        selectedOrder={selectedOrder}
        closeDeleteModal={closeDeleteModal}
      />
      <DeleteModal
        closeDeleteModal={closeDeleteModal}
        text={selectedOrder?.id}
        id={selectedOrder?.id}
        handleDelete={deleteOrder}
      />
      {isLoadingOrders ? (
        <main style={{ height: `calc(100% - 151px` }}>
          <FullPageLoader />
        </main>
      ) : (
        <main className="row w-100">
          <div className="col-9">
            <h1 className="fs-5 mt-1">訂單列表</h1>
            <hr className="mb-4" />
            <table className="table my-3">
              <thead>
                <tr>
                  {/* <th scope="col" width="2%">
                No
              </th> */}
                  <th scope="col" width="25%">
                    訂單編號
                  </th>
                  <th scope="col" width="35%">
                    品項
                  </th>
                  <th scope="col" width="8%">
                    姓名
                  </th>
                  <th scope="col" width="9%" className="text-end">
                    金額
                  </th>
                  <th scope="col" width="13%">
                    訂單日期
                  </th>
                  <th scope="col" width="8%" className="text-center">
                    付款狀態
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order.id}>
                    {/* <td>{index + 1}</td> */}
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

                        return date.toLocaleString('zh-TW', options);
                      })()}
                    </td>
                    <td className="text-center">
                      <span
                        className={
                          order.is_paid ? 'text-success' : 'text-danger'
                        }
                      >
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
            <footer className="d-flex justify-content-between align-items-end">
              <p className="ps-1">
                目前有 <span>{orders.length}</span> 筆訂單
              </p>
              <Pagination pagination={pagination} changePage={getOrders} />
            </footer>
          </div>
          <div className="col-3">
            {/* QUESTION: 為什麼舊訂單無法 fetch imagesUrl[0]  */}
            <h2 className="fs-5 mt-1">訂單細節</h2>
            <hr className="mb-4" />
            {selectedOrder ? (
              <div className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title fs-6">
                    訂單編號：{selectedOrder.id}
                  </h5>
                  <p>
                    訂單日期：
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

                      return date.toLocaleString('zh-TW', options);
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
                      小計：$
                      {Object.values(selectedOrder.products)
                        ?.reduce((total, product) => total + product.total, 0)
                        ?.toLocaleString()}
                    </p>
                    <p>
                      折扣碼：
                      {Object.values(selectedOrder.products)[0]?.coupon?.code ||
                        '無'}
                    </p>
                    <p>
                      總金額：${selectedOrder?.total?.toLocaleString()}{' '}
                      <span
                        className={`badge rounded-pill text-light ${
                          selectedOrder.is_paid
                            ? 'text-bg-success'
                            : 'text-bg-danger'
                        }`}
                      >
                        {selectedOrder.is_paid ? '已付款' : '未付款'}
                      </span>
                    </p>
                  </div>
                  <hr />
                  <div>
                    <p className="card-text">姓名：{selectedOrder.user.name}</p>
                    <p className="card-text">
                      電子郵件：{selectedOrder.user.email}
                    </p>
                    <p className="card-text">電話：{selectedOrder.user.tel}</p>
                    <p className="card-text">
                      地址：{selectedOrder.user.address}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm mt-4 w-100"
                    onClick={() => openOrderModal(selectedOrder)}
                  >
                    編輯
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray">請選擇一個訂單查看</p>
            )}
          </div>
        </main>
      )}
    </>
  );
};

export default AdminOrder;
