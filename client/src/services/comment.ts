import { axiosInstanceOne } from 'utils/axios';

interface ICommentData {
  article_id: number
  user_id: number
  content: string
}

// FOREIGN KEYS/ Primary keys - CommentLikes/ ArticleLikes
const createComment = async (commentData: ICommentData): Promise<string> => {
  try {
    const response = await axiosInstanceOne.post('/comments/', commentData);
    return response.data;
  } catch (error) {
    throw Error(error);
  }
};

const getComments = async (id: number): Promise<number> => {
  try {
    const response = await axiosInstanceOne.get(`/comments/${id}`);
    return response.data;
  } catch (error) {
    throw Error(error);
  }
};

const likeComment = async (id: number, userId: number): Promise<string> => {
  const user_id = userId;

  try {
    const response = await axiosInstanceOne.put(`/comments/like/${id}`, { user_id });
    return response.data;
  } catch (error) {
    throw Error(error);
  }
};

export {
  createComment,
  getComments,
  likeComment
};
