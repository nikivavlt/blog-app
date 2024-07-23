import express from 'express';
import search from '../controllers/search.js';

const router = express.Router();

router.route('')
  .get(search);

export default router;
