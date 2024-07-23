import express from 'express'

import { createArticle, deleteArticle, getArticles, getArticle, updateArticle } from '../controllers/article.js'

const router = express.Router()

router.route('/')
  .get(getArticles)
  .post(createArticle)

router.route('/:url')
  .get(getArticle)
  .put(updateArticle)
  .delete(deleteArticle)

export default router
