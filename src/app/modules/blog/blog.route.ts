import { Router } from 'express';
import { BlogController } from './blog.controller';
import validateRequest from '../../middleware/validateRequest';
import { BlogValidation } from './blog.validation';
import auth from '../auth/auth';

const blogRouter = Router();

blogRouter.post(
  '/create-blog',
  auth('user'),
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogController.createBlog,
);
blogRouter.put('/:id', auth('user'), BlogController.updateBlog);

blogRouter.delete('/:id', auth('user'), BlogController.deleteBlog);
blogRouter.get('/:id', BlogController.getSingleBlog);
blogRouter.get('/', auth('user'), BlogController.getBlog);

export default blogRouter;
