import { useQuery } from '@tanstack/react-query';
import { getBookmarkedShows } from '../../services/apiShows';

export const useBookmarkedShows = () => {
  const {
    data: bookmarkedShows = [],
    error,
    isPending,
  } = useQuery({
    queryKey: ['bookmarkedShows'],
    queryFn: getBookmarkedShows,
  });

  return {
    isPending,
    bookmarkedShows,
    error,
  };
};
