import styled from 'styled-components';

const FileInput = styled.input.attrs({ type: 'file' })`
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    margin-right: 1.2rem;
    border-radius: var(--border-radius-sm);
    border: none;
    color: var(--color-white);
    background-color: var(--color-red);
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: var(--color-white);
      color: var(--color-semi-dark-blue);
    }
  }
`;

export default FileInput;
