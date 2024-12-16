import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
  padding: 2.3rem 3rem;
  background-color: var(--color-semi-dark-blue);
  border: none;
  border-radius: var(--border-radius-lg);

  & p {
    text-align: center;
  }

  @media (min-width: 48em) {
    padding: 3.2rem 3.2rem;
  }
`;

export default Form;
