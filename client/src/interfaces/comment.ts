interface IComment {
  id: number
  content: string
  article_id: number
  user_id: number
  created_at: Date
  updated_at: Date
  like: number
};

export default IComment;
