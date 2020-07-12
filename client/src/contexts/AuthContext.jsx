import React, { createContext, useState } from 'react';

export const authContext = createContext({});

const Store = props => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);

  const store = {
    get: {
      auth,
      user,
      loading,
    },
    set: {
      auth: newAuth => setAuth(newAuth),
      user: newUser => setUser(newUser),
      loading: newLoading => setLoading(newLoading),
    },
  };

  return <authContext.Provider value={{ store }}>{props.children}</authContext.Provider>;
};

export default Store;
