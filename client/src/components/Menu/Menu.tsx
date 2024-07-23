import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArticleService from '../../services/article';
import './styles.scss';
import type IArticle from 'interfaces/article';

interface IProps {
  category: number
  currentArticleId: number
}

// Sidebar tag
const Menu = ({ category, currentArticleId }: IProps): JSX.Element => {
  const [articles, setArticles] = useState<IArticle[]>([]);

  // useEffect hook is used to fetch articles related to the category
  useEffect(() => {
    // Defining an async function fetchData to fetch articles related to the category using axios
    const fetchData = async (): Promise<void> => {
      if (category !== null) {
        try {
          const test = `?category=${category}`;
          const response = await ArticleService.getArticles(test);
          setArticles(response);
        } catch (err) {
          console.log(err);
        }
      }
    };
    // Calling fetchData function to fetch data when component is mounted or when category is changed
    fetchData();
  }, [category]);

  return (
    // <div>
    //     <Link className='link' to="/articles/?category=test">
    //       <h4>
    //         Test category
    //       </h4>
    //     </Link>
    //     <h1>Other articles you may like</h1>
    //     Where should be other articles (map) and 'Read more' button
    // </div>
    <div className="menu">
      <h1>Other articles you may like</h1>
      {articles?.map((article) => (
        currentArticleId === article.id
          ? null
          : (<div className="article" key={article.id}>
          <img src={article.image?.includes('//') ? `${article.image}` : `/${article.image}`} alt="Articles image" />
          <h2>{article.title}</h2>
          {/* Using Link component to navigate to the article */}
          <Link className="link" to={`/articles/${article.url}`}>
          {/* hardcoded? */}
            <button>Read More</button>
          </Link>
        </div>)
      ))}
    </div>
  );
};

export default Menu;
