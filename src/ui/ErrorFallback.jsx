import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import PropTypes from 'prop-types';
import Button from './Button';
import Heading from './Heading';

const StyledErrorFallback = styled.main`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-dark-blue);
  padding: 4.8rem;
`;

const Box = styled.div`
  background-color: var(--color-semi-dark-blue);
  border: 1px solid var(--color-grey-blue-75);
  border-radius: var(--border-radius-xs);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
    color: var(--color-red);
  }

  & p {
    margin-bottom: 3.2rem;
    color: var(--color-primary-grey-blue-75);
  }
`;

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <GlobalStyles />
      <StyledErrorFallback>
        <Box>
          <Heading as="h1">Oops, something went wrong!</Heading>
          <p>
            Please try again later or contact support if the problem persists.
            <br />
            Error details: {error.message}
          </p>
          <Button
            type="button"
            onClick={resetErrorBoundary}>
            Try again
          </Button>
        </Box>
      </StyledErrorFallback>
    </>
  );
}
ErrorFallback.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
  resetErrorBoundary: PropTypes.func.isRequired,
};
export default ErrorFallback;
