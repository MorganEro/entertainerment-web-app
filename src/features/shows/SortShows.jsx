import { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import SortByDropdown from '../../ui/SortbyDropdown';

const SortContainer = styled.div`
  position: relative;
  display: inline-block;
  z-index: 9999;
`;

const SortButton = styled.button`
  background-color: transparent;
  color: ${({ $isActive }) =>
    $isActive ? 'var(--color-white)' : 'var(--color-grey-blue)'};
  border: none;
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    color: var(--color-white);
  }
  &:focus {
    outline: none;
  }

  &:active {
    outline: none;
    border: none;
  }
`;

const SortShows = () => {
  const [$isOpen, set$IsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || 'year-desc';

  const toggleDropdown = () => set$IsOpen(!$isOpen);

  const handleOptionClick = selectedOptionValue => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sortBy', selectedOptionValue);
    setSearchParams(newParams);
    set$IsOpen(false);
  };

  return (
    <SortContainer>
      <SortButton
        id="sort-button"
        aria-label="Sort by"
        onClick={toggleDropdown}
        $isActive={$isOpen}>
        <IoMdArrowDropdown />
      </SortButton>
      <SortByDropdown
        $isOpen={$isOpen}
        onOptionClick={handleOptionClick}
        selectedOption={sortBy}
      />
    </SortContainer>
  );
};

export default SortShows;
