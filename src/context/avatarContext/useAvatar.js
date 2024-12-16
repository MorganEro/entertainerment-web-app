import { useContext } from 'react';
import { AvatarContext } from './AvatarProvider';

function useAvatar() {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error('useAvatar must be used within a AvatarProvider');
  }
  return context;
}

export { useAvatar };
