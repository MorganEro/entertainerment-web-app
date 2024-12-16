import styled from 'styled-components';

const ButtonIcon = styled.button`
  background: none;
  border: none;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  display: flex;
  align-items: center;

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-gray-blue);
    transition: all 0.3s;

    @media (min-width: 48em) {
      width: 2rem;
      height: 2rem;
    }
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-white);
  }
`;

export default ButtonIcon;
