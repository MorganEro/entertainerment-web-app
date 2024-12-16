import styled from 'styled-components';
import InputRow from './InputRow';
import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { PasswordListContainer } from './PasswordCriteriaList';

const PasswordInputWrapper = styled(InputRow)`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr max-content max-content;
  position: relative;

  &:focus-within ${PasswordListContainer} {
    display: flex;
    flex-direction: column;
    opacity: 1;
  }
`;

const TogglePasswordButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-white-50);
  justify-self: end;
`;

function PasswordInputRow({
  children,
  onToggleVisibility,
  showPassword,
  $hasError,
}) {
  return (
    <PasswordInputWrapper $hasError={$hasError}>
      {children}
      <TogglePasswordButton
        type="button"
        onClick={onToggleVisibility}>
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </TogglePasswordButton>
    </PasswordInputWrapper>
  );
}

PasswordInputRow.propTypes = {
  children: PropTypes.node.isRequired,
  onToggleVisibility: PropTypes.func.isRequired,
  showPassword: PropTypes.bool.isRequired,
  $hasError: PropTypes.bool,
};
export default PasswordInputRow;
