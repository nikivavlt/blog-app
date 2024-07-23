import React, { useEffect, useState } from 'react';
import cleanHTML from 'utils/helpers/clean-html';

import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { getArticles } from 'store/actions/article';
import type IArticle from 'interfaces/article';
import type { Dispatch } from 'redux';
import type { IState } from 'store/store';
import type { IDispatch } from 'store/actions/article';

import './styles.scss';

interface IStateProps {
  articles: IArticle[]
}

interface IDispatchProps {
  getArticles: (category: string) => IDispatch
}

interface IProps extends IStateProps, IDispatchProps {}

const Articles = ({ articles, getArticles }: IProps): JSX.Element => {
  const [currentArticles, setCurrentArticles] = useState<IArticle[]>([]);

  const category = useLocation().search;

  useEffect(() => {
    getArticles(category);
  }, [category]);

  useEffect(() => {
    setCurrentArticles(articles);
  }, [articles]);

  return (
    // article semantic tag
    <div>Articles (list-of-articles.component.tsx)
      <div className='articles'>
        {currentArticles.map((article) =>
          (<div className='article' key={article.id}>

            <div className='article-image'>
              <img src={article.image?.includes('//') ? `${article.image}` : `/${article.image}`} alt="Articles image" />
            </div>
            <div className='content'>
              <Link className='link' to={`/articles/${article.url}`}>
                <h2>
                  Title: {article.title}
                </h2>
              </Link>
              <div>
                Description: <p dangerouslySetInnerHTML={{ __html: cleanHTML(article.description) }}></p>
              </div>
              <Link to={`/articles/${article.url}`}>
                <button>
                  <p>
                    Read more
                  </p>
                </button>
              </Link>
            </div>
          </div>)
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState): IStateProps => {
  const { articles } = state;

  return {
    articles
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IDispatchProps => ({
  getArticles: (category: string) => dispatch(getArticles(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(Articles);

// interface IProps {
//   article: IArticle
// }

// const ArticleItem = ({ article }: IProps) => {
// const { id, title, description, authorId } = article;
// const shortItemTitle = title.length > 30 ? title.substring(0, 30) + '...' : title;
// const shortItemDescription = description.length > 145 ? description.substring(0, 145) + '...' : description;
// // make Link for entire item
// return (
//   <article className="article">
//     <div className='article__image'>
//       <Image src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="Article image" width={500} height={300} />
//     </div>
//     <div className='article__content'>
//       <Link href={`/articles/${id}`}><h3>{shortItemTitle}</h3></Link>
//       <p>{shortItemDescription}</p>
//     </div>
//     <div className='article__footer'>
//       <Link href={`/users/${authorId}`} className='article__author'>
//         <div className='article__author-avatar'>
//           <Image src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="Author avatar" width={135} height={43} />
//         </div>
//         <div className='article__author-details'>
//           <h5>By: Test Testov</h5>
//           <small>2015-05-10</small>
//         </div>
//       </Link>
//       <Link href={`/articles/${id}`} className='button category'>Read more</Link>
//     </div>
//   </article>
// );
// };

// export default ArticleItem;
