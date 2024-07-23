import type { Middleware } from 'redux';
import ArticleService from 'services/article';

import {
  CREATE_ARTICLE,
  GET_ARTICLES,
  UPDATE_ARTICLE,
  DELETE_ARTICLE
} from 'utils/constants/action-types';

export const articleMiddleware: Middleware = () => (next) => async (action) => {
  if (action.type === GET_ARTICLES) {
    const { category } = action.payload;

    try {
      const articles = await ArticleService.getArticles(category);
      action.payload = articles;
    } catch (error) {
      console.log(error);
    }
  }
  return next(action);
};
