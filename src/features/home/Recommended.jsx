import PropTypes from 'prop-types';
import Show from '../../ui/Show';
import ShowList from '../../ui/ShowList';
import { useShows } from '../shows/useShows';

function Recommended({ sortedShows }) {
  const { shows } = useShows();
  const recommendedShows =
    sortedShows.length > 0
      ? sortedShows
      : shows.filter(show => !show.isTrending);

  return (
    <ShowList>
      {recommendedShows.map(show => (
        <Show
          show={show}
          key={show.id}
        />
      ))}
    </ShowList>
  );
}

Recommended.propTypes = {
  sortedShows: PropTypes.array.isRequired,
};
export default Recommended;
