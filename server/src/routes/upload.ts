import upload from "../controllers/upload.js";
import express from 'express';

const router = express.Router();

router.route('/')
  .post(upload);

export default router;
