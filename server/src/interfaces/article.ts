interface IArticle {
  id: number
  title: string
  description: string
  image: string
  url: string
  categoryId: number
  authorId: number
  createdAt: Date
  updatedAt: Date
};

export default IArticle;
