import styled from 'styled-components';

const ShowList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(16.4rem, 1fr));
  justify-content: center;
  gap: 1.6rem;

  @media (min-width: 48em) {
    grid-template-columns: repeat(3, minmax(22rem, 1fr));
    gap: 3rem;
  }

  @media (min-width: 90em) {
    grid-template-columns: repeat(4, minmax(28rem, 1fr));
    gap: 4rem;
  }
`;

export default ShowList;
