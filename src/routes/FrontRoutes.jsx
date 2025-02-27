import { Outlet } from 'react-router';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Message from '../components/Message';

const FrontRoutes = () => {
  return (
    <div className="front-layout">
      <Message />
      <Header />
        <Outlet />
      <Footer />
    </div>
  );
};

export default FrontRoutes;
