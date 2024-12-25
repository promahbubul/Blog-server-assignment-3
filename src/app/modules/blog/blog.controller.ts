import { Request, Response } from 'express';
import { BlogService } from './blog.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../error/AppError';

const createBlog = catchAsync(async (req, res) => {
  const result = await BlogService.createBlog(req.body);

  const author = result.author as unknown as {
    _id: string;
    email: string;
    name: string;
  };

  sendResponse(res, {
    status: true,
    message: 'Blog created successfully',
    statusCode: httpStatus.CREATED,
    data: {
      _id: result._id,
      title: result.title,
      content: result.content,
      author: {
        _id: author._id,
        email: author.email,
        name: author.name,
      },
    },
  });
});

const getSingleBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BlogService.getSingleBlog(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  sendResponse(res, {
    status: true,
    statusCode: httpStatus.OK,
    message: 'Blog retrieve successfully',
    data: result,
  });
});

const getBlog = catchAsync(async (req, res) => {
  const result = await BlogService.getBlogs(req.query);

  sendResponse(res, {
    status: true,
    message: 'Blogs fetched successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  await BlogService.deleteBlog(id, req.user as string[]);
  sendResponse(res, {
    status: true,
    message: 'Blog deleted successfully',
    statusCode: httpStatus.OK,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const blog = req.body;
  const result = await BlogService.updateBlog(id, blog, req.user as JwtPayload);
  sendResponse(res, {
    status: true,
    statusCode: httpStatus.OK,
    message: 'Blog updated successfully',
    data: result,
  });
});

export const BlogController = {
  getBlog,
  getSingleBlog,
  createBlog,
  deleteBlog,
  updateBlog,
};
