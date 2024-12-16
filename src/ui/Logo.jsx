import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const sizes = {
  large: css`
    width: 32px;
    height: 25.6px;
  `,

  regular: css`
    width: 25px;
    height: 20px;

    @media (min-width: 48em) {
      width: 32px;
      height: 25.6px;
    }
  `,
};

const StyledLogo = styled.div`
  text-align: center;
`;
const Img = styled.img`
  ${props => (props.$size === 'large' ? sizes.large : sizes.regular)}
`;

function Logo({ $size }) {
  return (
    <StyledLogo>
      <Img
        src="/logo.svg"
        alt="Entertainment Web App"
        $size={$size}
      />
    </StyledLogo>
  );
}

Logo.propTypes = {
  $size: PropTypes.oneOf(['large', 'regular']),
};

export default Logo;
