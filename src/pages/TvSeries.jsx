import useDocumentTitle from '../hooks/useDocumentTitle';
import ShowPage from '../ui/ShowPage';

function TvSeries() {
  useDocumentTitle('TV Series');

  return (
    <ShowPage
      title="TV Series"
      placeholder="Search for a TV series"
      queryKey="tvSeries"
    />
  );
}

export default TvSeries;
