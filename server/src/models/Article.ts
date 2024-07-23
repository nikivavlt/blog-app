import database from '../config/database.js';
import type IArticle from '../interfaces/article.js';

// OR
// const Employee = function(employee) {
//   this.designation = employee.designation;
//   this.doj = employee.doj;
//   this.name = employee.name;
//   this.salary = employee.salary;
// };

class Article {
  title: string;
  description: string;
  image: string;
  url: string;
  categoryId: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor (article: Article) {
    this.title = article.title;
    this.description = article.description;
    this.image = article.image;
    this.url = article.url;
    this.categoryId = article.categoryId;
    this.authorId = article.authorId;
    this.createdAt = article.createdAt;
    this.updatedAt = article.updatedAt;
  }

  // remove * from ALL QUERIES!!!
  static getArticles = (callback: (error: any, data: IArticle[] | null) => void, categoryName: string = ''): void => {
    const defaultQuery = 'SELECT a.*, c.name as category FROM articles a JOIN categories c ON a.category_id = c.id';
    const categoryQuery = 'SELECT a.*, c.name as category FROM articles a JOIN categories c ON a.category_id = c.id WHERE c.name = ?';

    const query = (categoryName === '')
      ? defaultQuery
      : categoryQuery;

    database.query<IArticle[]>(query, [categoryName], (error, data) => {
      if (error !== null) {
        callback(error, null);
      }

      callback(null, data);
    });

    createArticle = (callback) => {
      const query = 'INSERT INTO articles(`title`, `description`, `image`, `url`, `category_id`, `author_id`, `created_at`, `updated_at`) VALUES (?)';

      const { createArticle, ...rest } = this;

      database.query(query, [Object.values(rest)], (error, data) => {
        if (error) {
          callback(error, null);
          return;
        }
        // First argument in callback represents an error.
        // If no error occurred, the first argument should be null by convention in Node.js.
        callback(null, data);
      });
    };
  };
}

export default Article;
