import { useSearchParams } from 'react-router-dom';
import Heading from './Heading';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Show from './Show';
import ShowContainer, { TrendingContainer } from './ShowContainer';
import ShowList from './ShowList';
import Spinner from './Spinner';
import SortShows from '../features/shows/SortShows';
import PropTypes from 'prop-types';
import { useShows } from '../features/shows/useShows';
import Trending from '../features/home/Trending';

const ShowPage = ({
  placeholder,
  queryKey,
  title,
  title2,
  isCategory,
  isHomepage,
}) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sortBy') || 'year-desc';
  const { shows, isPending } = useShows(queryKey);

  const filteredShows = shows
    .filter(show => show.title.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'year-desc':
          return b.year - a.year;
        case 'year-asc':
          return a.year - b.year;
        default:
          return 0;
      }
    });

  const bookmarkedMovies = filteredShows.filter(
    show => show.category === 'Movie'
  );
  const bookmarkedTVSeries = filteredShows.filter(
    show => show.category === 'TV Series'
  );
  const trendingShows = filteredShows.filter(show => show.isTrending);
  const recommendedShows = filteredShows.filter(show => !show.isTrending);

  if (isPending) return <Spinner />;

  return (
    <ShowContainer>
      <SearchBar placeholder={placeholder} />
      <Heading as="h2">
        {title}{' '}
        {!query ? (
          <span>
            <SortShows />
          </span>
        ) : (
          ''
        )}
      </Heading>
      {query ? (
        <SearchResults results={filteredShows} />
      ) : (
        <>
          {!isHomepage ? (
            <ShowList>
              {!isCategory
                ? filteredShows?.map(show => (
                    <Show
                      show={show}
                      key={show.id}
                    />
                  ))
                : bookmarkedMovies?.map(show => (
                    <Show
                      show={show}
                      key={show.id}
                    />
                  ))}
            </ShowList>
          ) : (
            <TrendingContainer>
              <Trending sortedShows={trendingShows} />
            </TrendingContainer>
          )}
          {title2 && (
            <>
              <Heading
                as="h1"
                className="secondHeading">
                {title2}{' '}
              </Heading>
              <ShowList>
                {isHomepage
                  ? recommendedShows?.map(show => (
                      <Show
                        show={show}
                        key={show.id}
                      />
                    ))
                  : !isCategory
                  ? filteredShows?.map(show => (
                      <Show
                        show={show}
                        key={show.id}
                      />
                    ))
                  : bookmarkedTVSeries?.map(show => (
                      <Show
                        show={show}
                        key={show.id}
                      />
                    ))}
              </ShowList>
            </>
          )}
        </>
      )}
    </ShowContainer>
  );
};

ShowPage.propTypes = {
  placeholder: PropTypes.string.isRequired,
  queryKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  title2: PropTypes.string,
  isCategory: PropTypes.bool,
  isHomepage: PropTypes.bool,
};

export default ShowPage;
