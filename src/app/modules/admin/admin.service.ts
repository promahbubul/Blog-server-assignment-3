import { JwtPayload } from 'jsonwebtoken';
import User from '../user/user.model';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';

const userBlock = async (userId: string, user: JwtPayload) => {
  const singleUser = await User.findOne({ _id: userId });
  if (!singleUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (singleUser.isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is Already blocked');
  }

  if (user.role !== 'admin') {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Only admin users can block users',
    );
  }

  //   change for admin users blocked
  singleUser.isBlocked = true;
  await singleUser.save();
};

const userDelete = async (id: string, user: JwtPayload) => {
  const singleBlog = await User.findOne({ _id: id });
  if (!singleBlog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  if (user.role !== 'admin') {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'Only admin users can block users',
    );
  }

  await User.findByIdAndDelete(id);
};

export const AdminService = {
  userBlock,
  userDelete,
};
