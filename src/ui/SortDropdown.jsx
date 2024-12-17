import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaRegCircle, FaRegDotCircle } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';

const scaleIn = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
    transform-origin: top right;
  }
  100% {
    transform: scale(1);
    opacity: 1;
    transform-origin: top right;
  }
`;

const Dropdown = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  position: absolute;
  top: 1.5rem;
  right: 0.6rem;
  background-color: var(--color-semi-dark-blue);
  /* border: 1px solid var(--color-grey-blue-75); */
  border-radius: var(--border-radius-md);
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-md);
  animation: ${({ $isOpen }) =>
    $isOpen &&
    css`
      ${scaleIn} .2s ease forwards
    `};

  @media (min-width: 48em) {
    top: 2.4rem;
  }
`;

const StyledDotCircle = styled(FaRegDotCircle)`
  color: var(--color-grey-blue);
`;

const Option = styled.div`
  color: var(--color-white-50);
  padding: 0.6rem 0rem 0.6rem 1.2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-blue-75);
  }

  &.selected {
    color: var(--color-white);
  }
`;

function SortDropdown({ $isOpen, onOptionClick }) {
  const sortOptions = [
    { value: 'year-desc', label: 'Newest First' },
    { value: 'year-asc', label: 'Oldest First' },
    { value: 'name-asc', label: 'Title A-Z' },
    { value: 'name-desc', label: 'Title Z-A' },
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || 'year-desc';
  const [selectedOption, setSelectedOption] = useState(sortBy);

  function handleChange(option) {
    searchParams.set('sortBy', option.value);
    setSearchParams(searchParams);
    setSelectedOption(option.value);
    onOptionClick(option.value);
  }

  return (
    <Dropdown $isOpen={$isOpen}>
      {sortOptions.map(option => (
        <Option
          key={option.value}
          className={selectedOption === option.value ? 'selected' : ''}
          onClick={() => handleChange(option)}>
          {selectedOption === option.value ? (
            <StyledDotCircle />
          ) : (
            <FaRegCircle />
          )}
          {option.label}
        </Option>
      ))}
    </Dropdown>
  );
}

SortDropdown.propTypes = {
  $isOpen: PropTypes.bool.isRequired,
  onOptionClick: PropTypes.func.isRequired,
};

export default SortDropdown;
