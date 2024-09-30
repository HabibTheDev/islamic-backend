import { Router } from 'express';
import { BlogController } from './announcement.controller';

const router = Router();

router.post('/announcement', BlogController.createBlog);
router.get('/announcement/:id', BlogController.getBlog);
router.get('/announcement', BlogController.getAllBlogs);
router.put('/announcement/:id', BlogController.updateBlog);

export const BlogRoutes = router;
