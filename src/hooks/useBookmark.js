import { useState, useEffect } from 'react';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('HiSeulgiMap')) || [];
    setBookmarks(saved);
  }, []);

  function toggleBookmark(id) {
    let updated;

    if (bookmarks.includes(id)) updated = bookmarks.filter(itemId => itemId !== id);
    else updated = [...bookmarks, id];

    setBookmarks(updated);

    localStorage.setItem('HiSeulgiMap', JSON.stringify(updated));
  }

  return { bookmarks, toggleBookmark };
};
