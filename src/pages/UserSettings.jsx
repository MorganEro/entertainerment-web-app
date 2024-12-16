import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import styled from 'styled-components';
import UpdateUserForm from '../features/authentication/UpdateUserForm';
import { useLogout } from '../features/authentication/useLogout';
import Button from '../ui/Button';
import SpinnerMini from '../ui/SpinnerMini';
import { AvatarProvider } from '../context/avatarContext/AvatarProvider';

const UserSettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  background-color: var(--color-dark-blue);
  gap: 1.6rem;
  padding: 1.6rem;
  margin-bottom: 3rem;

  @media (min-width: 48em) {
    padding: 2.5rem;
    gap: 2.5rem;
    margin-bottom: 5rem;
    justify-self: center;
    width: 70%;
  }

  @media (min-width: 64em) {
    padding: 5rem 3.2rem 5rem 3.2rem;
    gap: 3.2rem;
    max-width: 60vw;
    margin: 0 auto;
  }

  & > button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    align-self: flex-end;
  }
`;

function UserSettings() {
  const { isPending, logout } = useLogout();

  return (
    <UserSettingContainer>
      <Button
        $size="small"
        $variation="logout"
        onClick={logout}
        disabled={isPending}>
        {!isPending ? <HiArrowRightOnRectangle size={20} /> : <SpinnerMini />}{' '}
        Log Out
      </Button>

      <AvatarProvider>
        <UpdateUserForm />
      </AvatarProvider>
    </UserSettingContainer>
  );
}

export default UserSettings;
