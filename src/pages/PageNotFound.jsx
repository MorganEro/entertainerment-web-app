import styled from 'styled-components';
import Heading from '../ui/Heading';
import { useMoveBack } from '../hooks/useMoveBack';
import Button from '../ui/Button';
import useDocumentTitle from '../hooks/useDocumentTitle';

const StyledPageNotFound = styled.main`
  height: 100vh;
  background-color: var(--color-semi-dark-blue);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  border: 1px solid var(--color-grey-blue);
  border-radius: var(--border-radius-sm);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & img {
    margin-bottom: 3.2rem;
    border-radius: var(--border-radius-sm);
  }

  & h3 {
    margin-bottom: 3.2rem;
  }
`;

function PageNotFound() {
  useDocumentTitle('Page not found');
  const moveBack = useMoveBack();
  return (
    <StyledPageNotFound>
      <Box>
        <img
          src="/404.png"
          alt="Page not found"
        />
        <Heading as="h3">
          Sorry, the page you are looking for was not found. Please go back.
        </Heading>
        <Button onClick={moveBack}> Go back</Button>
      </Box>
    </StyledPageNotFound>
  );
}

export default PageNotFound;
