import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const StyledBookMarkIcon = styled.div`
  border-radius: 50%;
  height: 3.2rem;
  width: 3.2rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-dark-blue-50);

  ${({ $position }) =>
    $position === 'absolute'
      ? css`
          position: absolute;
          top: 1rem;
          right: 1rem;
          z-index: 1;
        `
      : css``}
  & svg path {
    stroke: var(--color-white);
  }

  &:hover {
    background-color: var(--color-white);
    & svg path {
      stroke: var(--color-dark-blue);
    }
  }
`;

function BookmarkIcon({ bookmarked, $position, onClick }) {
  return (
    <StyledBookMarkIcon
      $position={$position}
      onClick={onClick}>
      {bookmarked ? (
        <svg
          width="12"
          height="14"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.61 0c.14 0 .273.028.4.083a1.03 1.03 0 0 1 .657.953v11.928a1.03 1.03 0 0 1-.656.953c-.116.05-.25.074-.402.074-.291 0-.543-.099-.756-.296L5.833 9.77l-4.02 3.924c-.218.203-.47.305-.756.305a.995.995 0 0 1-.4-.083A1.03 1.03 0 0 1 0 12.964V1.036A1.03 1.03 0 0 1 .656.083.995.995 0 0 1 1.057 0h9.552Z"
            fill="#FFF"
          />
        </svg>
      ) : (
        <svg
          width="12"
          height="14"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
            stroke="#FFF"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      )}
    </StyledBookMarkIcon>
  );
}

BookmarkIcon.propTypes = {
  bookmarked: PropTypes.bool,
  $position: PropTypes.string,
  onClick: PropTypes.func,
};
export default BookmarkIcon;
