import type React from 'react';
import { useContext, useMemo } from 'react';

import { AuthContext } from 'context/AuthContext';
import { axiosInstanceOne, axiosInstanceTwo } from 'utils/axios';
import { setToken } from 'store/actions/token';
import store from 'store/store';

interface IComponentProps {
  children: React.ReactNode
}

const Interceptors: React.FC<IComponentProps> = ({ children }): React.ReactNode => {
  const { setCurrentUser } = useContext(AuthContext);

  useMemo(() => { // useMemo???
    axiosInstanceOne.interceptors.request.use((config) => {
      const accessToken = store.getState().token;

      if (accessToken !== null) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    axiosInstanceOne.interceptors.response.use((response) => response,
      async (error) => {
        const previousRequest = error?.config;
        if (error.response.status === 401 && error.response.headers['auth-middleware']) { // don't HARDCODE destructure instead
          const { dispatch } = store;

          try {
            const response = await axiosInstanceTwo.get('/refresh');

            const { id, username, newAccessToken } = response.data;
            dispatch(setToken(newAccessToken));
            setCurrentUser({ id, username }); // fix this bug (below setter too)
            return await axiosInstanceOne.request(previousRequest);
          } catch (error) {
            console.log(error);
          }
          setCurrentUser(null); // !!! ???
          // OR await signOut(); SO THEN cleancookie not necessary in backend
        }
        throw error;
      });
  }, [setCurrentUser]);

  return children;
};

export default Interceptors;
