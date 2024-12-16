import PropTypes from 'prop-types';
import Heading from './Heading';
import Show from './Show';
import ShowList from './ShowList';
import { useSearchParams } from 'react-router-dom';

function SearchResults({ results }) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  return (
    <>
      <Heading as="h1">
        Found {results.length} {results.length > 1 ? 'results' : 'result'} for{' '}
        &apos;{query}&apos;
      </Heading>
      <ShowList>
        {results?.map(show => (
          <Show
            show={show}
            key={show.id}
          />
        ))}
      </ShowList>
    </>
  );
}

SearchResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object),
};
export default SearchResults;
