import PropTypes from 'prop-types';
import { createContext, useState } from 'react';
import { useUser } from '../../features/authentication/useUser';

const AvatarContext = createContext();

function AvatarProvider({ children }) {
  const { user } = useUser();
  const [imagekitUrl, setImagekitUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [preview, setPreview] = useState(user.user_metadata.avatar || null);
  const [uploadError, setUploadError] = useState(null);
  const avatarName =
    user.user_metadata.fullName.replace(/\s+/g, '') + '-avatar';

  const handleUploadError = err => {
    setUploadError(err);
    console.log('Error', err);
    // setPreview(null);
  };

  const handleAvatarOnSuccess = res => {
    setPreview(res.url);
    setImagekitUrl(res.url);
    setUploadError(null);
  };

  const handleUploadProgress = progressEvent => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setUploadProgress(percentCompleted);
  };

  return (
    <AvatarContext.Provider
      value={{
        imagekitUrl,
        setImagekitUrl,
        uploadProgress,
        setUploadProgress,
        handleUploadError,
        handleUploadProgress,
        preview,
        setPreview,
        uploadError,
        setUploadError,
        avatarName,
        handleAvatarOnSuccess,
      }}>
      {children}
    </AvatarContext.Provider>
  );
}

AvatarProvider.propTypes = {
  children: PropTypes.node,
};

export { AvatarContext, AvatarProvider };
