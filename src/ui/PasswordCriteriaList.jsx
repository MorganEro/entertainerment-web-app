import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export const PasswordListContainer = styled.ul`
  list-style-type: none;
  position: absolute;
  bottom: 0;
  transform: translateX(0px) translateY(-48px);
  background-color: var(--color-dark-blue);
  border-radius: var(--border-radius-md);
  gap: 0.5rem;
  padding: 1rem;
  display: none;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  @media (min-width: 64em) {
    transform: translateX(-206px) translateY(11px);
  }

  & li {
    color: var(--color-white);
    font-size: var(--font-size-sm);
  }
`;

const passwordCriteria = [
  { id: 1, label: 'At least 8 characters long', pattern: /.{8,}/ },
  { id: 2, label: 'Contains an uppercase letter', pattern: /[A-Z]/ },
  { id: 3, label: 'Contains a lowercase letter', pattern: /[a-z]/ },
  { id: 4, label: 'Contains a number', pattern: /\d/ },
  { id: 5, label: 'Contains a special character', pattern: /[@$!%*?&]/ },
];

const PasswordCriteriaList = ({ password }) => {
  const [unmetCriteria, setUnmetCriteria] = useState(passwordCriteria);

  useEffect(
    function () {
      const newUnmetCriteria = passwordCriteria.filter(
        criterion => !criterion.pattern.test(password)
      );
      setUnmetCriteria(newUnmetCriteria);
    },
    [password]
  );

  if (unmetCriteria.length === 0) {
    return null;
  }

  return (
    <PasswordListContainer>
      {unmetCriteria.map(criterion => (
        <li key={criterion.id}>{criterion.label}</li>
      ))}
    </PasswordListContainer>
  );
};

PasswordCriteriaList.propTypes = {
  password: PropTypes.string.isRequired,
};

export default PasswordCriteriaList;
