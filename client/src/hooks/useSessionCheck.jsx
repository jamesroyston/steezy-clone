import { useEffect, useContext } from 'react';
import { authContext } from '../contexts/AuthContext';
import { sessionCheck } from '../api/api';

export default function useSessionCheck() {
  const { store } = useContext(authContext);

  useEffect(() => {
    sessionCheck()
      .then(data => {
        if (data === null || data === undefined) {
          sessionCheck();
        }
        if (data?.username) {
          store.set.user(data.username);
          store.set.auth(true);
        }
        if (!data?.isAuthenticated) {
          store.set.user('');
          store.set.auth(false);
        }
        store.set.loading(false);
      })
      .catch(error => console.log(error));
  }, [store.get.auth, store.set]);
}
