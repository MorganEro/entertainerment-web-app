import { useEffect } from 'react';

export function useKey(key, action) {
  useEffect(() => {
    function callback(event) {
      if (event.code && key && event.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }

    if (typeof key === 'string' && typeof action === 'function') {
      document.addEventListener('keydown', callback);

      return () => {
        document.removeEventListener('keydown', callback);
      };
    } else {
      console.error('useKey requires a valid key string and action function');
    }
  }, [action, key]);
}
