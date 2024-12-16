import styled from 'styled-components';

const StyledProgress = styled.progress`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  height: 0.4rem;
  background-color: var(--color-white);
  border-radius: var(--border-radius-md);
  margin-top: 1rem;

  &::-webkit-progress-bar {
    background-color: var(--color-white);
    border-radius: var(--border-radius-md);
  }

  &::-webkit-progress-value {
    background-color: var(--color-red);
    border-radius: var(--border-radius-md);
  }

  &::-moz-progress-bar {
    background-color: var(--color-red);
    border-radius: var(--border-radius-md);
  }
`;

export default StyledProgress;
