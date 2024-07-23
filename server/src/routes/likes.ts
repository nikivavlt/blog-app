import express from 'express'
import { getLikes, addLike } from '../controllers/likes.js'

const router = express.Router()

router.route('/')
  .post(addLike);

router.route('/:id')
  .get(getLikes);

export default router
