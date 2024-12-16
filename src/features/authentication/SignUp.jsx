import styled from 'styled-components';
import SignUpForm from './SignUpForm';
import Logo from '../../ui/Logo';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const SignUpLayout = styled.main`
  display: grid;
  place-content: center;
  height: 100vh;
  gap: 6rem;
  background-color: var(--color-dark-blue);
  margin-inline: 2rem;
`;

function SignUp() {
  useDocumentTitle('Sign up');
  return (
    <SignUpLayout>
      <Logo $size="large" />
      <SignUpForm />
    </SignUpLayout>
  );
}

export default SignUp;
