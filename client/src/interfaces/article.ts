interface IArticle {
  id: number
  title: string
  description: string
  image: string
  author: string
  authorImage: string
  category: number
  url: string
  date: Date
  categoryId: number
};

export default IArticle;
