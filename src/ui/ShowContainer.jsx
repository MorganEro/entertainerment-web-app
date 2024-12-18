import styled, { css } from 'styled-components';

export const TrendingContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  position: relative;
  z-index: 5;
`;

const ShowContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.6rem;
  padding: 1.6rem 1.6rem 5rem 1.6rem;

  @media (min-width: 48em) {
    padding: 2.5rem 2.5rem 5rem 2.5rem;
    gap: 2rem;
  }

  @media (min-width: 64em) {
    padding: 5rem 3.2rem 5rem 3.2rem;
    gap: 3.2rem;
  }

  & > h1 {
    display: flex;
    & span {
      margin-left: auto;
    }
  }

  & .secondHeading {
    padding-top: 3rem;

    @media (min-width: 48em) {
      padding-top: 4rem;
    }
  }

  ${({ $variant }) =>
    $variant === 'home' &&
    css`
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
    `}
`;

export default ShowContainer;
