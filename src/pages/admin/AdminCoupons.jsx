import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import CouponModal from '../../components/CouponModal';
import DeleteModal from '../../components/DeleteModal';
import { Modal } from 'bootstrap';
import Pagination from '../../components/Pagination';

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [pagination, setPagination] = useState({});
  const [type, setType] = useState('create');
  const [tempCoupon, setTempCoupon] = useState({});

  // QUESTION: useRef()? 2024-12-16
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

    getCoupons();
  }, []);

  async function getCoupons(page = 1) {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupons?page=${page}`
    );
    console.log(res.data);
    setCoupons(res.data.coupons);
    setPagination(res.data.pagination);
  }

  async function deleteCoupon(id) {
    // const res = await axios.delete(
    //   `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${id}`
    // );
    // console.log(res);
    // alert(res.data.message);
    // console.log('delete', id);
    closeDeleteModal();
    getCoupons(pagination.current_page);
  }

  function openCouponModal(type, product) {
    setType(type);
    setTempCoupon(product);
    couponModal.current.show();
  }

  function closeCouponModal() {
    couponModal.current.hide();
    console.log('hide');
  }

  function openDeleteModal(product) {
    setTempCoupon(product);
    deleteModal.current.show();
  }

  function closeDeleteModal() {
    deleteModal.current.hide();
  }

  return (
    <main>
      <CouponModal
        closeCouponModal={closeCouponModal}
        getCoupons={getCoupons}
        type={type}
        tempCoupon={tempCoupon}
        // FIXME: put API 後 getProduct() 刷新又回到第一頁
        currentPate={pagination.current_page}
      />
      <DeleteModal 
        closeDeleteModal={closeDeleteModal}
        text={tempCoupon.code}
        id={tempCoupon.id}
        handleDelete={deleteCoupon}
      />
      <header className="d-flex align-items-center">
        <h1 className="fs-5">折扣碼列表</h1>
        <button
          type="button"
          className="btn btn-outline-primary btn-sm ms-2"
          onClick={() => openCouponModal('create', {})}
        >
          <i className="bi bi-plus-lg"></i> 新增折扣碼
        </button>
      </header>
      <hr />

      <table className="table my-3">
        <thead>
          <tr>
            <th scope="col" width="15%">
              折扣碼
            </th>
            <th scope="col" width="30%">
              說明
            </th>
            <th scope="col" width="20%" className="text-end">
              折扣
            </th>
            <th scope="col" width="20%">
              到期時間
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
          {coupons && coupons.map((coupon) => {
            return (
              <tr key={coupon.id}>
                <td>{coupon.code}</td>
                <td>
                  {coupon.title}
                </td>
                {/* <td className="text-center">{100 - coupon.percent}% off</td> */}
                <td className="text-end">{coupon.percent % 10 === 0  ? `${coupon.percent / 10}折` : `${coupon.percent}折`}</td>
                <td className="text-start">{(() => {
                    const date = new Date(coupon.due_date);

                    const options = {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    };

                    return date.toLocaleString('zh-TW', options);
                  })()}</td>
                <td className="text-center">
                  {coupon.is_enabled ? '已啟用' : '未啟用'}
                </td>
                <td className="text-center">
                  <button type="button" className="btn btn-primary btn-sm"
                  onClick={() => openCouponModal('edit', coupon)}>
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
          目前有 <span>{coupons.length}</span> 個折扣碼
        </p>
        <Pagination pagination={pagination} changePage={getCoupons}/>
      </footer>
    </main>
  );
};

export default AdminCoupons;
