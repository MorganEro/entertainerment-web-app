import { IKImage } from 'imagekitio-react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useBookmark } from '../features/bookmarked/useBookmark';
import { urlEndpoint } from '../services/imagekitConfig';
import BookmarkIcon from './BookmarkIcon';
import Heading from './Heading';

const PlayContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: var(--border-radius-xl);
  padding: 1rem;
  background-color: var(--color-white-25);
  gap: 2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: var(--color-white-50);
  }
`;

const ImgContainer = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;

  ${({ $variant }) =>
    $variant === 'Trending'
      ? css`
          grid-column: 1 / -1;
          grid-row: 1 / -1;
        `
      : css`
          height: 11rem;
          overflow: visible;

          @media (min-width: 48em) {
            height: 14rem;
          }

          @media (min-width: 64em) {
            height: 17.4rem;
          }
        `}
`;

const Picture = styled.picture`
  width: 100%;
  height: 100%;

  img {
    border-radius: var(--border-radius-sm);
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    transition: opacity 0.3s ease-in-out;
  }
`;

const ShowContainer = styled.li`
  display: grid;
  position: relative;
  width: 100%;

  border-radius: var(--border-radius-sm);

  ${({ $variant }) =>
    $variant === 'Trending'
      ? css`
          grid-template-rows: 1fr;

          @media (min-width: 48em) {
            height: 23rem;
          }
        `
      : css`
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        `}

  &:hover ${Picture} img {
    opacity: 0.5;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover ${PlayContainer} {
    opacity: 1;
    scale: 1;
    transform: translate(-50%, -50%) scale(1);
    transition: all 0.3s ease-in-out;
  }
`;

const Description = styled.div`
  display: flex;
  border-radius: var(--border-radius-sm);
  flex-direction: column;
  font-weight: var(--font-weight-light);

  ${({ $variant }) =>
    $variant === 'Trending'
      ? css`
          position: absolute;
          bottom: 1rem;
          z-index: 1;
          left: 1rem;
          font-size: var(--font-size-xs);

          @media (min-width: 48em) {
            font-size: var(--font-size-md);
          }
        `
      : css`
          max-width: 100%;
          font-size: var(--font-size-xxs);

          @media (min-width: 48em) {
            font-size: var(--font-size-sm);
          }
        `}
  & > div {
    display: flex;
    gap: 1rem;
    align-items: center;
    color: var(--color-white-75);

    & > .category {
      white-space: nowrap;
    }

    & > img {
      height: 1rem;
      width: 1rem;
      margin-right: -0.5rem;
    }
  }
  & > .title {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

function Show({ $variant, show }) {
  const { year, title, category, rating } = show;
  const { isBookmarked, handleToggleBookmark } = useBookmark(
    show.isBookmarked,
    show.id
  );

  const getImageSrc = size => {
    const baseUrl = 'https://ik.imagekit.io/3wvmuwil3/thumbnails/';

    if ($variant === 'Trending') {
      return size === 'small'
        ? `${baseUrl}${show.thumbnail_trending_small}`
        : `${baseUrl}${show.thumbnail_trending_large}`;
    }
    return size === 'small'
      ? `${baseUrl}${show.thumbnail_regular_small}`
      : size === 'medium'
      ? `${baseUrl}${show.thumbnail_regular_medium}`
      : `${baseUrl}${show.thumbnail_regular_large}`;
  };

  return (
    <ShowContainer $variant={$variant}>
      <ImgContainer $variant={$variant}>
        <Picture>
          <source
            srcSet={getImageSrc('large')}
            media="(min-width: 64em)"
          />
          <source
            srcSet={getImageSrc('medium')}
            media="(min-width: 48em)"
          />
          <IKImage
            urlEndpoint={urlEndpoint}
            src={getImageSrc('small')}
            alt={title}
            transformation={[{ height: 230, width: 470 }]}
            loading="lazy"
            lqip={{ active: true, quality: 20 }}
          />
        </Picture>

        <PlayContainer>
          <svg
            width="30"
            height="30"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 0C6.713 0 0 6.713 0 15c0 8.288 6.713 15 15 15 8.288 0 15-6.712 15-15 0-8.287-6.712-15-15-15Zm-3 21V8l9 6.5-9 6.5Z"
              fill="#FFF"
            />
          </svg>
          <Heading as="h4">Play</Heading>
        </PlayContainer>
      </ImgContainer>

      <BookmarkIcon
        bookmarked={isBookmarked}
        $position="absolute"
        onClick={handleToggleBookmark}
      />

      <Description $variant={$variant}>
        <div>
          <span>{year}</span>
          <span>&#8226;</span>
          <img
            src={
              category === 'Movie'
                ? '/icon-category-movie.svg'
                : '/icon-category-tv.svg'
            }
            alt={category}
          />{' '}
          <span className="category">
            {category === 'Movie' ? 'Movie' : 'TV Series'}
          </span>
          <span>&#8226;</span>
          <span>{rating}</span>
        </div>
        {$variant === 'Trending' ? (
          <Heading
            as="h3"
            className="title">
            {title}
          </Heading>
        ) : (
          <Heading
            as="h4"
            className="title">
            {title}
          </Heading>
        )}
      </Description>
    </ShowContainer>
  );
}

Show.propTypes = {
  $variant: PropTypes.string,
  show: PropTypes.object,
};
export default Show;
