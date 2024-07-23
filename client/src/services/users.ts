import { axiosInstanceOne } from 'utils/axios';

import type IUser from 'interfaces/user';

class UserService {
  async verifyUser (): Promise<boolean> {
    try {
      await axiosInstanceOne.post('/auth/verify');
    } catch (error) {
      if (error.response.status === 401) {
        return false;
      }
    }
    return true;
  }

  async getUser (username: string): Promise<void> {
    try {
      const response = await axiosInstanceOne.get(`/users/${username}`);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UserService();
