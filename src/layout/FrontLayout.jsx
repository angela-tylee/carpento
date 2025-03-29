import { useState, useEffect, useContext } from 'react';
import { Outlet } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import Message from '../components/Message';
import useScrollToTop from '../hooks/useScrollToTop';
import { StickyHeaderContext } from '../context/StickyHeaderContext';

const FrontLayout = () => {
  
  useScrollToTop();

  const { headerHeight } = useContext(StickyHeaderContext);

    // dynamic padding top for fix mobile menu
    const [paddingTop, setPaddingTop] = useState(0);
  
    useEffect(() => {
      function updatePadding() {
        if (window.matchMedia("(min-width: 768px)").matches) {
          setPaddingTop("0px");
        } else {
          setPaddingTop(`${headerHeight}px`);
        }
      }
  
      updatePadding(); 
  
      window.addEventListener("resize", updatePadding);
      return () => window.removeEventListener("resize", updatePadding);
  
    }, [headerHeight]);

  return (
    <div className="front-layout">
      <Message />
      <Header />
        <div style={{ paddingTop }}>
          <Outlet />
        </div>
      <Footer />
    </div>
  );
};

export default FrontLayout;
