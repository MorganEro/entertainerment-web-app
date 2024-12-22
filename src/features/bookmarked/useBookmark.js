import { useState } from 'react';
import { useUser } from '../authentication/useUser';
import { useToggleBookmark } from './useToggleBookmark';
import { useBookmarkedShows } from './useBookmarkedShows';

export const useBookmark = ShowId => {
  const { user } = useUser();
  const userId = user?.id;
  const { bookmarkedShows } = useBookmarkedShows(userId);
  const isBookmarkedInitial = bookmarkedShows.some(
    bookmark => bookmark.id === ShowId
  );

  const [isBookmarked, setIsBookmarked] = useState(isBookmarkedInitial);
  const { toggleBookmark } = useToggleBookmark();

  const handleToggleBookmark = () => {
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);
    toggleBookmark({ userId, showId: ShowId, isBookmarked: newBookmarkState });
  };

  return { isBookmarked, handleToggleBookmark };
};
