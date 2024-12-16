import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useKey } from '../hooks/useKey';
import Input from './Input';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const SearchInput = styled(Input)`
  &::placeholder {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-light);

    @media (min-width: 48em) {
      font-size: var(--font-size-xl);
    }
  }
`;

const Img = styled.img`
  width: 1.8rem;
  height: 1.8rem;

  @media (min-width: 48em) {
    width: 2.4rem;
    height: 2.4rem;
  }
`;

function SearchBar({ placeholder }) {
  const inputEl = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');

  useKey('Enter', function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
  });

  const handleInputChange = e => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('query', newQuery);
    setSearchParams(newParams);
  };

  return (
    <SearchContainer>
      <Img
        src="/icon-search.svg"
        alt="Search"
      />
      <SearchInput
        name="search"
        id="search"
        className="search"
        type="text"
        placeholder={placeholder}
        ref={inputEl}
        value={query}
        onChange={handleInputChange}
        autoComplete="off"
      />
    </SearchContainer>
  );
}

SearchBar.propTypes = {
  placeholder: PropTypes.string,
};

export default SearchBar;
