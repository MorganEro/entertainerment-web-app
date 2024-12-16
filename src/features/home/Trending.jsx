import PropTypes from 'prop-types';
import styled from 'styled-components';
import Show from '../../ui/Show';
import { useShows } from '../shows/useShows';

const TrendingList = styled.ul`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 24rem;
  list-style: none;
  gap: 1.6rem;
  overflow-x: scroll;

  @media (min-width: 48em) {
    grid-auto-columns: 47rem;
    gap: 4rem;
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

function Trending({ sortedShows }) {
  const { shows } = useShows();
  const trendingShows =
    sortedShows.length > 0
      ? sortedShows
      : shows.filter(show => show.isTrending);

  return (
    <TrendingList>
      {trendingShows.map(show => (
        <Show
          key={show.id}
          $variant="Trending"
          show={show}
        />
      ))}
    </TrendingList>
  );
}

Trending.propTypes = {
  sortedShows: PropTypes.array.isRequired,
};
export default Trending;
