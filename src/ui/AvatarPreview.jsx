import styled from 'styled-components';
import { useAvatar } from '../context/avatarContext/useAvatar';
import { IKContext, IKImage } from 'imagekitio-react';
import { urlEndpoint } from '../services/imagekitConfig';

const PreviewContainer = styled.div`
  position: absolute;
  bottom: -6px;
  left: 23rem;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: firstInputField;
  width: 5rem;
  height: 5rem;
  gap: 1rem;
`;

const PreviewImage = styled(IKImage)`
  outline: 2px solid var(--color-grey-blue);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const AvatarPreview = () => {
  const { preview } = useAvatar();

  return (
    <PreviewContainer>
      <IKContext urlEndpoint={urlEndpoint}>
        <PreviewImage
          className="previewImage"
          src={preview}
          transformation={[
            {
              height: 50,
              width: 50,
              quality: 70,
            },
          ]}
        />
      </IKContext>
    </PreviewContainer>
  );
};

export default AvatarPreview;
