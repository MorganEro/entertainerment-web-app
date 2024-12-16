import styled from 'styled-components';

const UpdateForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr min-content;
  align-items: center;
  gap: 2.6rem;
  padding: 1rem;

  @media (min-width: 64em) {
    padding: 3.2rem;
  }

  & .fieldGroup {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    @media (min-width: 48em) {
      gap: 3rem;
    }
  }

  & .buttonGroup {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
`;

export default UpdateForm;
