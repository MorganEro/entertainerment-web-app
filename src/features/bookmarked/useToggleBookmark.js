import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addBookmark, deleteBookmark } from '../../services/apiShows';

export const useToggleBookmark = () => {
  const queryClient = useQueryClient();

  const { mutate: toggleBookmark } = useMutation({
    mutationFn: async ({ userId, showId, isBookmarked }) => {
      if (isBookmarked) {
        // Add bookmark
        return await addBookmark(userId, showId);
      } else {
        // Remove bookmark
        return await deleteBookmark(userId, showId);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries('bookmarkedShows');
    },
  });

  return { toggleBookmark };
};
