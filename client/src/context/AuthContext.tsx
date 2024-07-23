import React, { type ReactNode, createContext, useEffect, useState } from 'react';

import { signIn as sign } from 'services/authentication';
import { setToken } from 'store/actions/token';
import store from 'store/store';
import type IUser from 'interfaces/user';

const AuthContext = createContext<any>({});

interface IProps {
  children: ReactNode
}

const AuthContextProvider = ({ children }: IProps): JSX.Element => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  const signIn = async (inputs: { username: string, password: string }): Promise<IUser> => {
    const { username, password } = inputs;

    const responseData = await sign(username, password);
    const { token, ...otherData } = responseData;

    setCurrentUser(otherData);

    return responseData;
  };

  const signOut = async (): Promise<void> => {
    await UserService.signOut();
    const { dispatch } = store;

    dispatch(setToken(null));

    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, signIn, signOut, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export {
  AuthContext,
  AuthContextProvider
};
