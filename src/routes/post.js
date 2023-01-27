import express from 'express';
import { createPost, getPost, getPostById, updatePost, deletePost } from '../controller/post.js';

const router = express.Router();

router.post('/post', createPost);
router.get('/post', getPost);
router.get('/post/:id', getPostById);
router.put('/post/:id', updatePost);
router.delete('/post/:id', deletePost);

export default router