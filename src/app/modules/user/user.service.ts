import AppError from '../../error/AppError';
import { TLoginUser } from '../auth/auth.interface';
import { IUser } from './user.interface';
import User from './user.model';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config/config';

const register = async (payload: IUser) => {
  const result = await User.create(payload);

  return result;
};

const login = async (payload: TLoginUser) => {
  const { email, password } = payload;
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (user.isBlocked) {
    throw new AppError(httpStatus.NOT_FOUND, 'User blocked');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError(httpStatus.NOT_FOUND, 'User password not match');
  }

  const token = jwt.sign(
    {
      email: user.email,
      password: user.password,
      role: user.role,
      _id: user._id,
    },
    config.jwt_secret as string,
    { expiresIn: '10d' },
  );

  // const verifiedUser = { email: user.email, role: user.role, name: user.name };
  
  return { token };
};

export const UserService = {
  register,
  login,
};
