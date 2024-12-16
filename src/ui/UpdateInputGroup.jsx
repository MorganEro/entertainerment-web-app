import styled from 'styled-components';

const UpdateInputGroup = styled.div`
  display: grid;
  position: relative;
  gap: 1rem;
  padding: 1rem 1rem 1.6rem 1rem;
  border-radius: var(--border-radius-md);
  grid-template-columns: 1fr;
  grid-template-areas:
    'label'
    'firstInputField'
    'secondInputField';

  @media (min-width: 48em) {
    padding: 1.6rem;
  }

  & .label {
    color: var(--color-red);
    grid-area: label;
    align-self: start;

    @media (min-width: 48em) {
      align-self: center;
    }
  }

  & .firstInputField {
    grid-area: firstInputField;
  }

  & .secondInputField {
    grid-area: secondInputField;
  }
`;

export default UpdateInputGroup;
