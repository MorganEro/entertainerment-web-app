import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateShow } from '../../services/apiShows';

export const useToggleBookmark = () => {
  const queryClient = useQueryClient();

  const { mutate: toggleBookmark } = useMutation({
    mutationFn: ({ id, isBookmarked }) => updateShow(id, { isBookmarked }),
    onSettled: () => {
      queryClient.invalidateQueries('bookmarkedShows');
    },
  });

  return { toggleBookmark };
};
