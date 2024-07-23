import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from 'context/AuthContext';
import type IComment from 'interfaces/comment';
import { createComment, getComments, likeComment } from 'services/comment';
import IUser from 'interfaces/user';

interface IProps {
  articleId: number
}

const CommentSection = ({ articleId }: IProps): JSX.Element => {
  const { currentUser } = useContext(AuthContext);

  const [comments, setComments] = useState<IComment[]>(null);
  const [commentContent, setCommentContent] = useState('');

  const handleClick = async (commentId: number): Promise<void> => {
    const response = await likeComment(commentId, currentUser.id);
  };

  useEffect(() => {
    const fetchComments = async () => {
      const response = await getComments(articleId);
      setComments(response);
    };

    if (articleId) {
      fetchComments();
    }
  }, [articleId]);

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    if (commentContent.length > 200) return;

    const data = { article_id: articleId, user_id: currentUser.id, content: commentContent };

    const response = await createComment(data);

    // if (response.ok) {
    //   console.log(response)
    //   setCommentContent('');
    // setComments([data, ...comments]) - to imidiately update state without refreshing page
    // }
  };

  return (
    <div>
      {(currentUser !== null)
        ? <div>
          <form onSubmit={handleSubmit}>
            <textarea name="comment" id="comment"
              placeholder='Add a comment...'
              rows={3} maxLength={200}
              onChange={(event) => { setCommentContent(event.target.value); }}
              value={commentContent}>
            </textarea>
            <button type='submit'>Submitttttttttttt</button>
          </form>
          <div>
            <p>{200 - commentContent.length} characters remaining</p>
          </div>
        </div>
        : <div>
          You must be signed in to comment.
          <Link to={'/signin'}>Sign In</Link>
        </div>
      }
        {(comments !== null)
          ? <>
            <div>Comments: {comments?.length}</div>
            {comments?.map((comment: IComment) => (
              <div key={comment.id}>
                {comment.content}
                <button onClick={() => { handleClick(comment.id); }}>Like</button>
              </div>
            ))}
          </>
          : <div>No comments for this article.</div> }
    </div>
  );
};

export default CommentSection;
