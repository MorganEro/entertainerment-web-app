import styled, { css } from 'styled-components';

const sizes = {
  large: css`
    font-size: var(--font-size-md);
    padding: 1.2rem 6.6rem;

    @media (min-width: 48em) {
      padding: 1.2rem 10.6rem;
    }

    @media (min-width: 64em) {
      padding: 1.2rem 15.6rem;
    }
  `,
  small: css`
    font-size: var(--font-size-sm);
    padding: 1rem 1.5rem;

    @media (min-width: 48em) {
      padding: 1rem 4rem;
    }

    @media (min-width: 64em) {
      padding: 1rem 6rem;
    }
  `,
};

const variations = {
  primary: css`
    color: var(--color-white);
    background-color: var(--color-red);

    &:hover:not(:disabled) {
      color: var(--color-semi-dark-blue);
      background-color: var(--color-white);
    }

    &:disabled {
      background-color: var(--color-red-disabled);
      color: var(--color-white-50);
    }
  `,
  cancel: css`
    color: var(--color-white);
    background-color: var(--color-grey-blue);

    &:hover:not(disabled) {
      color: var(--color-semi-dark-blue);
      background-color: var(--color-white);
    }

    &:active {
      color: var(--color-semi-dark-blue);
      background-color: var(--color-white);
    }

    &:focus {
      outline: none;
    }
  `,
  logout: css`
    color: var(--color-white);
    background-color: var(--color-semi-dark-blue);

    &:hover:not(:disabled) {
      color: var(--color-semi-dark-blue);
      background-color: var(--color-white-75);
    }
  `,
};

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-xs);

  &:disabled {
    cursor: not-allowed;
  }

  ${({ $size }) => sizes[$size]}
  ${({ $variation }) => variations[$variation]}
`;

Button.defaultProps = {
  $size: 'large',
  $variation: 'primary',
};

export default Button;
