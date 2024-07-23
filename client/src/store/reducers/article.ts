import {
  CREATE_ARTICLE,
  GET_ARTICLES,
  UPDATE_ARTICLE,
  DELETE_ARTICLE
} from 'utils/constants/action-types';
import type IArticle from 'interfaces/article';

const initialState: IArticle[] = [];

function articleReducer (articles = initialState, action: { type: string, payload: IArticle[] }): IArticle[] {
  const { type, payload } = action;

  switch (type) {
    case CREATE_ARTICLE:
      return [...articles, payload];

    case GET_ARTICLES:
      return payload;

    case UPDATE_ARTICLE:
      return articles.map((article) => {
        if (article.id === payload.id) {
          return {
            ...articles,
            ...payload
          };
        } else {
          return articles;
        }
      });

    case DELETE_ARTICLE:
      return articles.filter(({ id }) => id !== payload.id);

    default:
      return articles;
  }
}

export default articleReducer;
