import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Menu from 'components/Menu/Menu';
import { AuthContext } from 'context/AuthContext';
import ArticleService from 'services/article';
import './styles.scss';
import dateFromNow from 'utils/helpers/date-from-now.helper';
import type IArticle from 'interfaces/article';
import cleanHTML from 'utils/helpers/clean-html';
import { getLikes, addLike } from 'services/likes';
import CommentSection from 'components/CommentSection/CommentSection';
// import { Edit } from '../../assets/images/edit.png' - this case

const SingleArticle = (): JSX.Element => {
  const [article, setArticle] = useState<IArticle>({});

  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useContext(AuthContext);

  const articleUrl = location.pathname.split('/')[2];

  const fetchLikes = async (id: number): Promise<number> => {
    const likes = await getLikes(id);
    return likes;
  };

  useEffect(() => {
    const fetchArticle = async (): Promise<void> => {
      try {
        const data = await ArticleService.getArticle(articleUrl);
        const articleData = data.article;

        const articleId: number = articleData.article_id;
        const likes = await fetchLikes(articleId);
        articleData.likes = likes.count;

        setArticle(articleData);
      } catch (error) {
        console.log(error);

        navigate('*');
      }
    };

    fetchArticle();
    // wrong implementation 2 async one after one
  }, [articleUrl]);

  const handleLike = async () => {
    const likeResponse = await addLike(article.article_id, currentUser.id);
    console.log(likeResponse);

    if (likeResponse.status === 200) {
      const likes = await fetchLikes(article.article_id);

      setArticle((previousState) => ({
        ...previousState,
        likes: likes.count
      }));
    }
  };

  const handleDelete = async (): Promise<void> => {
    try {
      await ArticleService.deleteArticle(articleUrl);

      navigate('/');
    } catch (error) {
      console.log(error);
      // Make redirection to error page?
    }
  };

  return (
    // article semantic tag
    <div className='single-article'>
      <div className='content'>
        <h1>{article.title}</h1>
        <img src={article.image?.includes('//') ? `${article.image}` : `/${article.image}`} alt="Articles image" />
        <div className='user'>
          <img src={article.authorImage} alt="Author avatar" />
          <div className='user_info'>
            <span>{article.author}</span>
            <p>Posted { dateFromNow(article.created_at) } days ago</p>
          </div>
          {(currentUser !== null && currentUser.username === article.author) && <div className='buttons'>
            <Link to={`/editor?edit=${article.url}`} state={article}>
              <img src={require('../../assets/images/edit.png')} alt="Edit button" />
            </Link>
            <img onClick={handleDelete} src={require('../../assets/images/delete.png')} alt="Delete button" />
          </div>}
        </div>
        <p>
          Category: {article.category}
        </p>
        likes:{' '}
        {article.likes}

        <button onClick={handleLike}>Like</button>
        <br></br>

        comments for all with opportunity to reply, date and user role (Comment form - Photo)

        <div>
          Description:
          <p dangerouslySetInnerHTML={{ __html: cleanHTML(article.description) }}></p>
          <CommentSection articleId={article.article_id} />
        </div>
      </div>
      <div className='menu'>
        {(article !== null)
          ? <Menu category={article.category} currentArticleId={article.article_id}></Menu>
          : null
        }
      </div>
    </div>
  );
};

export default SingleArticle;

// const SingleArticle = () => {
//   return (
//     <article className="article-detail">
//       <div className="container article-detail__container">
//         <div className="article-detail__header">
//           {/* create author-details component */}
//           <Link href={`/users/3`} className='article__author'>
//             <div className='article__author-avatar'>
//               <Image src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="Author avatar" width={135} height={100} />
//             </div>
//             <div className='article__author-details'>
//               <h5>By: Test Testov</h5>
//               <small>2015-05-10</small>
//             </div>
//           </Link>
//           <div className="article-detail__buttons">
//             <Link href="/article/slug/edit" className="button small primary">Edit</Link>
//             <Link href="/article/slug/delete" className="button small danger">Delete</Link>
//           </div>
//         </div>
//         <h1>This is the article title</h1>
//         <div className="article-detail__image">
//           <Image src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="Article image" width={500} height={300} />
//         </div>
//         <p>
//           Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat minus numquam repellendus, mollitia iusto culpa molestiae necessitatibus maiores consequatur voluptate delectus pariatur aspernatur quia odit similique at cumque id nulla, ipsam explicabo, accusantium esse. Ratione officiis nobis alias neque error!
//         </p>
//         <p>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi doloremque quo dolorum, vel dolor iusto architecto natus, explicabo, itaque distinctio commodi porro vero consectetur deserunt facilis sint molestiae mollitia. Consectetur!
//         </p>
//         <p>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus animi esse, at quasi, culpa a amet aliquid illo ab voluptate similique iusto non est obcaecati quisquam voluptas quaerat consequatur totam officiis perspiciatis alias voluptates magnam. Ducimus nisi aut autem provident vel numquam. Voluptas, neque nemo dicta perferendis harum rerum vitae enim rem culpa fugiat illo. Ad, consequatur. Voluptatem architecto adipisci quia quis nesciunt quod dolorem. Molestiae molestias sapiente animi non impedit quos doloremque eos quo voluptate reiciendis consequatur quam, dolores vel, illum tempora necessitatibus eum unde corporis dolorem? Illo, corporis quo distinctio, tempora nostrum amet numquam quidem modi blanditiis ipsam quos tenetur in ullam repellat vel voluptatum, accusamus error vitae possimus. Alias vel, nostrum recusandae obcaecati hic accusantium quis. Amet, excepturi magnam itaque eos nemo corporis quisquam animi dolore incidunt maiores porro culpa beatae ex voluptatum reiciendis voluptas at. Voluptas laudantium minus excepturi voluptatibus doloribus.
//         </p>
//         <p>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam natus provident eligendi doloribus fugit commodi debitis voluptatum. Amet debitis, quam sunt odio esse temporibus itaque ipsa quas autem distinctio fugiat cupiditate! Ipsa ut vel explicabo ad, commodi tenetur, maiores praesentium doloribus numquam obcaecati accusantium eaque cumque, illo ipsam. Quibusdam illum, aspernatur voluptates tempore, suscipit delectus dolor non perferendis ad quisquam harum eveniet ut fugiat dolorem ab quo. Quam, iure. Voluptatibus veniam corporis facilis consequatur adipisci, sed asperiores esse fuga doloremque aliquam quasi vel minima eos sequi incidunt dolor iste voluptatem vitae ratione. Dolorem id odio enim laborum veritatis doloremque inventore, eligendi aliquid dignissimos in perferendis fugiat? Deleniti velit quaerat, eligendi fugit itaque commodi minus maxime eius! Aperiam nam, consequatur omnis doloribus corporis iste, nesciunt voluptates ducimus vitae aut dolorum repellat rem? Ex, maiores facilis? Commodi cupiditate delectus eaque odit, ea quos consequuntur, alias aperiam perspiciatis vel hic. Architecto molestias culpa quidem numquam officia ab praesentium ipsum, harum blanditiis est quasi eum hic repudiandae neque ducimus recusandae laboriosam amet aliquam labore eaque minima, soluta sed corrupti. Ea ad nobis quos sint explicabo, velit eum doloremque voluptatum, quis quidem odit autem. Facilis architecto similique labore vel repellat, in harum itaque. Iusto porro, sapiente doloribus accusantium cumque ipsa itaque, doloremque voluptatem aperiam error impedit ut atque veniam veritatis enim corrupti laboriosam cupiditate quas nostrum. Delectus magni reiciendis fuga amet obcaecati quo possimus exercitationem illo recusandae magnam aliquam labore, saepe nisi similique dolores perspiciatis provident. In, quibusdam tempora? Commodi, molestias rerum accusamus doloribus nostrum assumenda veritatis nulla suscipit ducimus quis sint modi a dicta eum nesciunt sed eveniet. Saepe enim nostrum alias voluptate. Sed doloremque nisi, culpa delectus dolorem natus odit dolores omnis molestiae provident repellendus iure accusantium. Hic dicta necessitatibus veritatis nesciunt. Voluptatibus, qui? Eos sit fugiat, vero nisi est incidunt magnam reprehenderit!
//         </p>
//       </div>
//     </article>
//   );
// };

// export default SingleArticle;
