import { useState } from 'react';
import { useToggleBookmark } from './useToggleBookmark';

export const useBookmark = (curBookmarkedState, id) => {
  const [isBookmarked, setIsBookmarked] = useState(curBookmarkedState);
  const { toggleBookmark } = useToggleBookmark();

  const handleToggleBookmark = () => {
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);
    toggleBookmark({ id, isBookmarked: newBookmarkState });
  };

  return { isBookmarked, handleToggleBookmark };
};
