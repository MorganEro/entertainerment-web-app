import styled from 'styled-components';

const Input = styled.input`
  color: var(--color-white);
  caret-color: var(--color-red);
  background-color: transparent;
  width: 100%;
  border: none;
  border-radius: 0;
  padding: 1.5rem;
  outline: none;
  overflow: hidden;
  white-space: nowrap;

  &:focus,
  &:active {
    outline: none;
    color: var(--color-white);
  }
  &::placeholder {
    color: var(--color-white-50);
  }
  &:focus::placeholder {
    color: var(--color-white-50);
    border: none;
  }

  /* Style the autocomplete dropdown */
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px var(--color-semi-dark-blue) inset;
    -webkit-text-fill-color: var(--color-white);
    transition: background-color 5000s ease-in-out 0s;
  }

  &:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px var(--color-semi-dark-blue) inset;
    -webkit-text-fill-color: var(--color-white);
    transition: background-color 5000s ease-in-out 0s;
  }
`;

export default Input;
