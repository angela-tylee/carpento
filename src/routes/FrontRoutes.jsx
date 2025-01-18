import { Outlet } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

const FrontRoutes = () => {
  return (
    <div className="front-layout">
      <Header />
        <Outlet />
      <Footer />
    </div>
  );
}

export default FrontRoutes;