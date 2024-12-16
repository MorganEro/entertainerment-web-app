import useDocumentTitle from '../hooks/useDocumentTitle';
import ShowPage from '../ui/ShowPage';

function Movies() {
  useDocumentTitle('Movies');

  return (
    <ShowPage
      title="Movies"
      placeholder="Search for a movie"
      queryKey="movies"
    />
  );
}

export default Movies;
