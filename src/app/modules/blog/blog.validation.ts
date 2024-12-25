import { z } from 'zod';

const createBlogValidationSchema = z.object({
  title: z.string(),
  content: z.string(),
  author: z.string(),
  isPublished: z.boolean().optional(),
});

export const BlogValidation = {
  createBlogValidationSchema,
};
