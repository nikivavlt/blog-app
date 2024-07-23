import React from 'react';
import { RouterProvider } from 'react-router-dom';

import 'styles/index.scss';
import router from 'utils/router';

const App = (): JSX.Element => {
  return (
    <RouterProvider router={router} />
  );
};

// function App (): JSX.Element {
//   return (
//     <div className='app'>
//       <div className='container'>
//         <RouterProvider router={router} />
//       </div>
//     </div>
//   );
// }

// const Primary = () => {
//   const [articles, setArticles] = useState(dummy);

//   return (
//     <section className="articles">
//       <div className="container article-container">
//         {articles.map((article: IArticle) => (
//           <ArticleItem key={article.id} article={article} />
//         ))}
//       </div>
//     </section>
//   );
// };

// ADD COOKIES POP-Up

export default App;
