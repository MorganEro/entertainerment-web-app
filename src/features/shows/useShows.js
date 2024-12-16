import { useQuery } from '@tanstack/react-query';
import {
  getBookmarkedShows,
  getShows,
  getShowsMovies,
  getShowsTvSeries,
} from '../../services/apiShows';

export const useShows = queryKey => {
  const queryFn = () => {
    switch (queryKey) {
      case 'movies':
        return getShowsMovies();
      case 'tvSeries':
        return getShowsTvSeries();
      case 'bookmarks':
        return getBookmarkedShows();
      case 'allShows':
        return getShows();
      default:
        return getShows();
    }
  };

  const {
    data: shows = [],
    error: showsError,
    isPending,
  } = useQuery({
    queryKey: [queryKey],
    queryFn,
  });

  return {
    isPending,
    shows,
    showsError,
  };
};
