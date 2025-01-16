import { createContext, useState, useEffect, useRef } from "react";

export const StickyHeaderContext = createContext();

export const StickyHeaderProvider = ({ children }) => {
  const [headerHeight, setHeaderHeight] = useState(0); 
  const unstickyDistance = 900; 
  const headerRef = useRef(null); 


  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight); 
    }
  }, []);

  return (
    <StickyHeaderContext.Provider value={{ headerHeight, unstickyDistance, headerRef }}>
      {children}
    </StickyHeaderContext.Provider>
  );
};