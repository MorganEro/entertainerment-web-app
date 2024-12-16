import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ToolTips from '../../ui/ToolTips';
import { useUser } from './useUser';
import { IKContext, IKImage } from 'imagekitio-react';
import { urlEndpoint } from '../../services/imagekitConfig';

export const AvatarImage = styled(IKImage)`
  width: 2.4rem;
  height: 2.4rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-white);
  transition: transform 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }

  @media (min-width: 48em) {
    width: 3.2rem;
    height: 3.2rem;
  }

  @media (min-width: 64em) {
    width: 4rem;
    height: 4rem;
  }
`;

function UserAvatar() {
  const navigate = useNavigate();
  const { user } = useUser();
  const avatarUrl =
    user.user_metadata.avatar || `${window.location.origin}/default-user.jpg`;

  const handleClick = () => {
    navigate('/userSettings');
  };

  return (
    <IKContext urlEndpoint={urlEndpoint}>
      <ToolTips
        content="User Profile"
        $size={1.3}
        To="avatar">
        <AvatarImage
          key={user.user_metadata.avatar}
          id="avatar"
          onClick={handleClick}
          alt="User Avatar"
          src={avatarUrl}
          lqip={{ active: true, quality: 20 }}
          loading="lazy"
          transformation={[
            {
              height: 40,
              width: 40,
              quality: 70,
              format: 'webp',
            },
          ]}
        />
      </ToolTips>
    </IKContext>
  );
}

export default UserAvatar;
