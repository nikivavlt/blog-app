import { axiosInstanceOne } from 'utils/axios';
import type IArticle from 'interfaces/article';
import ICategory from 'interfaces/category';

class ArticleService {
  async getArticles (category: string): Promise<IArticle[]> {
    try {
      const response = await axiosInstanceOne.get(`/articles${category}`);

      return response.data;
    } catch (error) {
      throw Error(error);
    }
  }

  async getArticle (url: string): Promise <IArticle> {
    try {
      const response = await axiosInstanceOne.get(`/articles/${url}`);
      return response.data;
    } catch (error) {
      throw Error(error);
    }
  }

  async createArticle (data: IArticle): Promise<string> {
    const { title, description, image, categoryId, date } = data;

    // use response ok/ sucess
    try {
      const response = await axiosInstanceOne.post('/articles/', {
        title,
        description,
        image,
        categoryId,
        date
      });
      return response.data;
    } catch (error) {
      throw Error(error);
    }
  }

  async updateArticle (id: number, data): Promise<string> {
    const [title, description, image] = data;

    try {
      const response = await axiosInstanceOne.put(`/articles/${id}`, {
        title,
        description,
        image
      });
      return response.data;
    } catch (error) {
      throw Error(error);
    }
  }

  async deleteArticle (url: string): Promise<string> {
    try {
      await axiosInstanceOne.delete(`/articles/${url}`);
    } catch (error) {
      throw Error(error);
    }
  }

  async getArticlesByString (queryString: string): Promise<IArticle[]> {
    // const queryValue = encodeURIComponent(searchString);

    try {
      const response = await axiosInstanceOne.get(`/search${queryString}`); // query string
      return response.data;
    } catch (error) {
      throw Error(error);
    }
  }

  async getCategories (): Promise<ICategory[]> {
    try {
      const response = await axiosInstanceOne.get('/categories');
      return response.data;
    } catch (error) {
      throw Error(error);
    }
  }
}

export default new ArticleService();
// Connect service to the project
