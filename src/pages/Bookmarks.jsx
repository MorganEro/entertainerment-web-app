import useDocumentTitle from '../hooks/useDocumentTitle';
import ShowPage from '../ui/ShowPage';

function Bookmarks() {
  useDocumentTitle('Bookmarks');

  return (
    <ShowPage
      title="Bookmarked Movies"
      title2="Bookmarked TV Series"
      placeholder="Search for bookmarked shows"
      isCategory={true}
      queryKey="bookmarks"
    />
  );
}

export default Bookmarks;
