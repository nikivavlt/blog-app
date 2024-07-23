import express from 'express';
import { createComment, getComments, likeComment } from '../controllers/comments.js';

const router = express.Router();

router.route('/')
  .post(createComment);

router.route('/:id')
  .get(getComments);

router.route('/like/:id')
  .put(likeComment);

export default router;
