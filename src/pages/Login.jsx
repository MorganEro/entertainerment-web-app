import styled from 'styled-components';
import LoginForm from '../features/authentication/LoginForm';
import Logo from '../ui/Logo';
import useDocumentTitle from '../hooks/useDocumentTitle';

const LoginLayout = styled.main`
  display: grid;
  place-content: center;
  height: 100vh;
  gap: 6rem;
  background-color: var(--color-dark-blue);
  margin-inline: 2rem;
`;

function Login() {
  useDocumentTitle('Login');
  return (
    <LoginLayout>
      <Logo $size="large" />
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
