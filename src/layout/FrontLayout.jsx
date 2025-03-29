import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import Message from '../components/Message';
import useScrollToTop from '../hooks/useScrollToTop';

const FrontLayout = () => {
  
  useScrollToTop();

  return (
    <div className="front-layout">
      <Message />
      <Header />
        <Outlet />
      <Footer />
    </div>
  );
};

export default FrontLayout;
