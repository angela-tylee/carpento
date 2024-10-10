import { Routes, Route, Link } from 'react-router-dom';
import FrontRoutes from './routes/FrontRoutes';
import AdminRoutes from './routes/AdminRoutes';
// import Dashboard from './pages/Dashboard';
// import Login from './pages/Login';
// import Modals from './pages/Modals';
// import ProductModal from './pages/ProductModal';
// import DeleteModal from './pages/DeleteModal';
// import CouponModal from './pages/CouponModal';
// import Message from './pages/Message';

function App() {
  return (
    <div className='App'>
      <Routes>
        {/* Front Pages Routes */}
        <Route path="/*" element={<FrontRoutes />} />
        
        {/* Admin Pages Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
      {
      /* <Link to='/login'>登入</Link> |<Link to='/dashboard'>Dashboard</Link> |
      <Link to='/modal/product'>Product Modal</Link> |
      <Link to='/modal/delete'>Delete Modal</Link> |
      <Link to='/modal/coupon'>Coupon Modal</Link> |
      <Link to='/message'>Message</Link> |
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/modal' element={<Modals />}>
          <Route path='product' element={<ProductModal />}></Route>
          <Route path='delete' element={<DeleteModal />}></Route>
          <Route path='coupon' element={<CouponModal />}></Route>
        </Route>
        <Route path='/message' element={<Message />} />
      </Routes> */}
    </div>
  );
}

export default App;
