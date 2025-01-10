import { useState, useEffect } from 'react';

function useSort(items) {
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortLabel, setSortLabel] = useState('');
  const [sortedItems, setSortedItems] = useState(items);

  // Effect to handle both initial items and updates
  useEffect(() => {
    if (!items?.length) return;
    
    // If no sort criteria, use original items
    if (!sortCriteria) {
      setSortedItems(items);
      return;
    }

    // Re-apply current sort to new items
    const sorted = [...items].sort((a, b) => {
      switch (sortCriteria) {
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'price-high-low':
          return b.price - a.price;
        case 'price-low-high':
          return a.price - b.price;
        case 'newest':
          return a.num - b.num;
        case 'oldest':
          return b.num - a.num;
        default:
          return 0;
      }
    });

    setSortedItems(sorted);
  }, [items, sortCriteria]);

  const handleSort = (criteria, e) => {
    setSortCriteria(criteria);
    // setSortCriteria(e.target.innerText);
    //   const label = e?.target.innerText;
      setSortLabel(e?.target.innerText);
  };
  

  return {
    sortCriteria,
    sortLabel,
    sortedItems,
    handleSort
  };
}

export default useSort;