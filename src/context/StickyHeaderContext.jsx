import { createContext, useState, useEffect, useRef } from "react";

export const StickyHeaderContext = createContext();

export const StickyHeaderProvider = ({ children }) => {
  const [headerHeight, setHeaderHeight] = useState(0); // Initialize with 0
  const unstickyDistance = 900; // Define unsticky distance
  const headerRef = useRef(null); // Reference for the header


  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight); // Dynamically set header height
    }
  }, []);

  return (
    <StickyHeaderContext.Provider value={{ headerHeight, unstickyDistance, headerRef }}>
      {children}
    </StickyHeaderContext.Provider>
  );
};

// export const useLayoutContext = () => useContext(LayoutContext);
