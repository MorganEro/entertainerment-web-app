import styled, { css } from 'styled-components';

const Heading = styled.h1`
  ${props =>
    props.as === 'h1' &&
    css`
      font-size: 3.2rem;
      font-weight: var(--font-weight-light);

      @media (min-width: 48em) {
        font-size: 3.2rem;
      }
    `}
  ${props =>
    props.as === 'h2' &&
    css`
      font-size: 2rem;
      font-weight: var(--font-weight-light);

      @media (min-width: 48em) {
        font-size: 3.2rem;
      }
    `}
  ${props =>
    props.as === 'h3' &&
    css`
      font-size: 1.5rem;
      font-weight: var(--font-weight-medium);

      @media (min-width: 48em) {
        font-size: 2.4rem;
      }
    `}
  ${props =>
    props.as === 'h4' &&
    css`
      font-size: 1.4rem;
      font-weight: var(--font-weight-medium);

      @media (min-width: 48em) {
        font-size: 1.8rem;
      }
    `}
`;

export default Heading;
