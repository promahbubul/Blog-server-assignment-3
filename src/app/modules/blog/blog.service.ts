/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../error/AppError';
import { TBlog } from './blog.interface';
import Blog from './blog.model';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { searchableFields } from './blog.const';

const createBlog = async (payload: TBlog) => {
  const result = (await Blog.create(payload)).populate('author');
  return result;
};

const getSingleBlog = async (id: string) => {
  const result = await Blog.findById(id);
  return result;
};

const deleteBlog = async (id: string, user: JwtPayload) => {
  const isExistBlog = await Blog.findById(id);

  if (!isExistBlog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  if (!(isExistBlog.author as any).equals(user._id)) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'User is not the author of the blog',
    );
  }

  const result = await Blog.findByIdAndDelete(id, { new: true });
  return result;
};

const updateBlog = async (id: string, blog: TBlog, user: JwtPayload) => {
  const isExistBlog = await Blog.findById(id);
  if (!(isExistBlog?.author as any).equals(user?._id)) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'User is not the author of the blog',
    );
  }
  const result = await Blog.findByIdAndUpdate(id, blog, {
    new: true,
    upsert: true,
  });
  return result;
};

const getBlogs = async (query: Record<string, unknown>) => {
  const searchQuery = new QueryBuilder(
    Blog.find().populate('author', 'name email'),
    query,
  )
    .search(searchableFields)
    .fields()
    .sort();
  const result = searchQuery.modelQuery;
  return result;
};

export const BlogService = {
  getBlogs,
  createBlog,
  getSingleBlog,
  deleteBlog,
  updateBlog,
};
