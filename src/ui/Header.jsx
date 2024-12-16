import styled from 'styled-components';

import NavLinks from './NavLinks';
import UserAvatar from '../features/authentication/UserAvatar';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem;
  height: 100%;
  background-color: var(--color-semi-dark-blue);
  z-index: 100;

  @media (min-width: 48em) {
    border-radius: var(--border-radius-md);
    padding: 2rem;
  }

  @media (min-width: 64em) {
    flex-direction: column;
    justify-content: flex-start;
    padding: 3.2rem;
    border-radius: var(--border-radius-lg);
    margin: 3.2rem 0 3.2rem 3.2rem;
    max-height: calc(100vh - 6.4rem);

    & > :first-child {
      margin-bottom: 7.5rem;
    }

    & > :last-child {
      margin-top: auto;
    }
  }
`;

function Header() {
  return (
    <StyledHeader>
      <Link to="/">
        <Logo />
      </Link>
      <NavLinks />
      <UserAvatar />
    </StyledHeader>
  );
}

export default Header;
