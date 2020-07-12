import React, { createContext, useState } from 'react';

export const authContext = createContext({});

const Store = props => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});

  const store = {
    get: {
      auth,
      user,
    },
    set: {
      auth: authCheck => setAuth(authCheck),
      user: newUser => setUser(newUser),
    },
  };

  return <authContext.Provider value={{ store }}>{props.children}</authContext.Provider>;
};

export default Store;
