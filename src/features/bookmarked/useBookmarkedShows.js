import { useQuery } from '@tanstack/react-query';
import { getBookmarkedShows } from '../../services/apiShows';

export const useBookmarkedShows = userId => {
  const {
    data: bookmarkedShows = [],
    error,
    isPending,
  } = useQuery({
    queryKey: ['bookmarkedShows', userId],
    queryFn: () => getBookmarkedShows(userId),
    enabled: !!userId,
  });

  return {
    isPending,
    bookmarkedShows,
    error,
  };
};
