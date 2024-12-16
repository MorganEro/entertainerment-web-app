import styled from 'styled-components';
import useDocumentTitle from '../hooks/useDocumentTitle';
import ShowContainer from '../ui/ShowContainer';
import ShowPage from '../ui/ShowPage';

export const TrendingContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  position: relative;
  z-index: 5;
`;

export const HomeContainer = styled(ShowContainer)`
  padding: 1.6rem 0rem 5rem 1.6rem;

  @media (min-width: 48em) {
    padding: 2.5rem 0rem 5rem 2.5rem;
  }

  @media (min-width: 64em) {
    padding: 5rem 0rem 5rem 3.2rem;
  }

  & > *:not(${TrendingContainer}) {
    padding-right: 1rem;

    @media (min-width: 48em) {
      padding-right: 2.5rem;
    }

    @media (min-width: 64em) {
      padding-right: 3.2rem;
    }
  }
`;

function Home() {
  useDocumentTitle('Home');

  return (
    <ShowPage
      title="Trending"
      title2="Recommended for you"
      placeholder="Search for bookmarked shows"
      category=""
      queryKey="allShows"
      isHomepage={true}
    />
  );
}

Home.whyDidYouRender = true;
export default Home;
