import styled from 'styled-components';

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0;
  border-bottom: 1px solid var(--color-grey-blue);

  ${({ $hasError }) =>
    $hasError &&
    `
    border-bottom: 1px solid var(--color-red);
  `}

  &:focus-within {
    border-bottom: 1px solid var(--color-white);
  }

  & .error {
    justify-self: end;
    color: var(--color-red);
    font-size: var(--font-size-sm);
  }
`;

export default InputRow;
