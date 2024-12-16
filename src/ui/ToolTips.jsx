import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const ToolTipsContainer = styled.div`
  position: absolute;
  color: var(--color-white);
  font-size: ${props => props.$size}rem;
  padding: 0.5rem;
  border-radius: var(--border-radius-sm);
  width: max-content;
  opacity: ${props => props.$opacity};
  transition: opacity 0.3s ease-in-out;
  transition-delay: 0.2s;
  ${props => {
    switch (props.$position) {
      case 'top':
        return 'bottom: 100%; left: 50%; transform: translateX(-50%);';
      case 'right':
        return 'top: 50%; left: 100%; transform: translateY(-50%);';
      case 'bottom':
        return 'top: 100%; left: 50%; transform: translateX(-50%);';
      case 'left':
        return 'top: 50%; right: 100%; transform: translateY(-50%);';
      default:
        return '';
    }
  }}
  margin: ${props => props.$offset}px;
`;

function ToolTips({
  children,
  content,
  $position = 'bottom',
  $size = 1,
  duration,
  $opacity = 0.6,
  $offset = 1,
  anchorTo,
}) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (opacity === $opacity && duration) {
      const timer = setTimeout(() => setOpacity(0), duration);
      return () => clearTimeout(timer);
    }
  }, [opacity, duration, $opacity]);

  const handleMouseEnter = () => setOpacity($opacity);
  const handleMouseLeave = () => {
    if (!duration) {
      setOpacity(0);
    }
  };

  const handleTouchStart = () => {
    setOpacity($opacity);
    setTimeout(() => setOpacity(0), 2000);
  };

  const handleTouchEnd = () => {
    if (!duration) {
      setOpacity(0);
    }
  };

  return (
    <div
      id={anchorTo}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ position: 'relative', display: 'inline-block' }}>
      {children}
      <ToolTipsContainer
        $size={$size}
        $position={$position}
        $opacity={opacity}
        $offset={$offset}>
        {content}
      </ToolTipsContainer>
    </div>
  );
}

ToolTips.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  $position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  duration: PropTypes.number,
  $opacity: PropTypes.number,
  $offset: PropTypes.number,
  anchorTo: PropTypes.string,
  $size: PropTypes.number,
};

export default ToolTips;
