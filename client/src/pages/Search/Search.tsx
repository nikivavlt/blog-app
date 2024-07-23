import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import ArticleService from '../../services/article';

const Search = (): JSX.Element => {
  const location = useLocation();

  useEffect(() => {
    const queryString = location.search;

    const fetchArticle = async (): Promise<void> => {
      // try catch
      const response = await ArticleService.getArticlesByString(queryString);
      console.log(response);
    };

    fetchArticle();
  }, [location.search]);

  return (
  // section tag
    <div>Search</div>
  );
};

export default Search;
