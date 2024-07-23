import type IUser from 'interfaces/user';
import { axiosInstanceOne } from 'utils/axios';

// try ... catch
const signIn = async (username: string, password: string): Promise<IUser> => {
  const response = await axiosInstanceOne.post('/auth/signin', { username, password });

  const { data, status } = response;

  return { ...data, status };
};

const signOut = async (): Promise<void> => {
  await axiosInstanceOne.post('/auth/signout');
};

const createUser = async ({ username, email, password }: { username: string, email: string, password: string }): Promise<void> => {
  await axiosInstanceOne.post('/auth/signup', { username, email, password });
};

export {
  createUser,
  signIn,
  signOut
};
