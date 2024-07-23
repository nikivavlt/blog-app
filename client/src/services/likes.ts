import { axiosInstanceOne } from 'utils/axios';

const getLikes = async (id: number): Promise<number> => {
  try {
    const response = await axiosInstanceOne.get(`/likes/${id}`);
    return response.data;
  } catch (error) {
    throw Error(error);
  }
};

const addLike = async (article_id: number, user_id: number): Promise<number> => {
  try {
    const response = await axiosInstanceOne.post('/likes/', {
      article_id,
      user_id
    });
    return response.data;
  } catch (error) {
    throw Error(error);
  }
};

export { getLikes, addLike };
