import { useEffect } from 'react';

function useDocumentTitle(title) {
  useEffect(() => {
    if (title) {
      document.title = title + ' | Entertainment Web App';
    } else {
      document.title = 'Entertainment Web App';
    }
  }, [title]);
}

export default useDocumentTitle;
