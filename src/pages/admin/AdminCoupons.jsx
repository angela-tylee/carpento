import { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import CouponModal from '../../components/CouponModal';
import DeleteModal from '../../components/DeleteModal';
import { Modal } from 'bootstrap';
import Pagination from '../../components/Pagination';
import { MessageContext } from '../../context/MessageContext';
import FullPageLoader from '../../components/FullPageLoader';

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [pagination, setPagination] = useState({});
  const [type, setType] = useState('create');
  const [tempCoupon, setTempCoupon] = useState({});
  const [isLoadingCoupons, setIsLoadingCoupons] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const { showMessage } = useContext(MessageContext);

  const couponModal = useRef(null);
  const deleteModal = useRef(null);

  useEffect(() => {
    couponModal.current = new Modal('#couponModal', {
      backdrop: 'static',
      keyboard: true,
    });

    deleteModal.current = new Modal('#deleteModal', {
      keyboard: true,
    });

    const couponModalElement = document.getElementById("couponModal");

    couponModalElement.addEventListener('hide.bs.modal', () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    });

    const deleteModalElement = document.getElementById("deleteModal");

    deleteModalElement.addEventListener('hide.bs.modal', () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    });

    getCoupons();
  }, []);

  const getCoupons = async (page = pagination.current_page) => {
    setIsLoadingCoupons(true);
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupons?page=${page}`
      );
      setCoupons(res.data.coupons);
      setPagination(res.data.pagination);
      setIsLoadingCoupons(false);
    } catch (error) {
      setIsLoadingCoupons(false);
    }
  };

  const deleteCoupon = async (id) => {
    setIsLoadingDelete(true);
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${id}`
      );
      setIsLoadingDelete(false);
      // showMessage('success', `成功：${res.data.message}`);
      showMessage('success', `Success: ${res.data.message}`);
      closeDeleteModal();
      getCoupons(pagination.current_page);
    } catch (error) {
      setIsLoadingDelete(false);
      // showMessage('danger', `失敗：${error.response.data.message}`);
      showMessage('danger', `Error: ${error.response.data.message}`);
      closeDeleteModal();
    }
  };

  function openCouponModal(type, product) {
    setType(type);
    setTempCoupon(product);
    couponModal.current.show();
  }

  function closeCouponModal() {
    couponModal.current.hide();
  }

  function closeDeleteModal() {
    deleteModal.current.hide();
  }

  return (
    <>
      <CouponModal
        closeCouponModal={closeCouponModal}
        getCoupons={getCoupons}
        type={type}
        tempCoupon={tempCoupon}
        currentPate={pagination.current_page}
        showMessage={showMessage}
      />
      <DeleteModal
        closeDeleteModal={closeDeleteModal}
        text={tempCoupon.code}
        id={tempCoupon.id}
        handleDelete={deleteCoupon}
        isLoadingDelete={isLoadingDelete}
      />
      {isLoadingCoupons ? (
        <main style={{ height: `calc(100% - 151px` }}>
          <FullPageLoader />
        </main>
      ) : (
        <main>
          <header className="d-flex align-items-center">
            {/* <h1 className="fs-5">折扣碼列表</h1> */}
            <h1 className="fs-5">Coupons</h1>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm ms-2"
              onClick={() => openCouponModal('create', {})}
            >
              {/* <i className="bi bi-plus-lg"></i> 新增折扣碼 */}
              <i className="bi bi-plus-lg"></i> Add Coupon
            </button>
          </header>
          <hr />

          <table className="table my-3">
            <thead>
              <tr>
                <th scope="col" width="15%">
                  {/* 折扣碼 */}
                  Coupon Code
                </th>
                <th scope="col" width="25%">
                  {/* 說明 */}
                  Description
                </th>
                <th scope="col" width="20%" className="text-end">
                  {/* 折扣 */}
                  Discount
                </th>
                <th scope="col" width="20%">
                  {/* 到期時間 */}
                  Due Date
                </th>
                <th scope="col" width="10%" className="text-center">
                  {/* 啟用狀態 */}
                </th>
                <th scope="col" width="20%" className="text-center">
                  {/* 編輯 */}
                </th>
              </tr>
            </thead>
            <tbody>
              {coupons &&
                coupons.map((coupon) => {
                  return (
                    <tr key={coupon.id}>
                      <td>{coupon.code}</td>
                      <td>{coupon.title}</td>
                      <td className="text-end">
                        {/* {coupon.percent % 10 === 0
                          ? `${coupon.percent / 10}折`
                          : `${coupon.percent}折`} */}
                        {coupon.percent}% off
                      </td>
                      <td className="text-start">
                        {(() => {
                          const date = new Date(coupon.due_date);

                          const options = {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          };

                          // return date.toLocaleString('zh-TW', options);
                          return date.toLocaleString('en-US', options);
                        })()}
                      </td>
                      <td className="text-center">
                        {/* {coupon.is_enabled ? '已啟用' : '未啟用'} */}
                        {coupon.is_enabled ? (
                        <span className="text-success">active</span>
                      ) : (
                        <span className="text-body-tertiary">expired</span>
                      )}
                      </td>
                      <td className="text-center">
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => openCouponModal('edit', coupon)}
                        >
                          {/* 編輯 */}
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <footer className="d-flex justify-content-between align-items-end">
            <p className="ps-1">
              {/* 目前有 <span>{coupons.length}</span> 個折扣碼 */}
              Total <span>{coupons.length}</span> coupons
            </p>
            <Pagination pagination={pagination} changePage={getCoupons} />
          </footer>
        </main>
      )}
    </>
  );
};

export default AdminCoupons;
