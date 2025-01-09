import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config/config';
import User from '../user/user.model';

const auth = (RequireRole: string) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const Berartoken = req.headers.authorization;
    const token = Berartoken?.split(' ')[1];
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Authorized');
    }

    const decoded = jwt.verify(token, config.jwt_secret as string);
    const { email, role, _id } = decoded as JwtPayload;

    // console.log(decoded);

    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    if (RequireRole !== role) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    req.user = decoded as JwtPayload;
    req.body.author = _id;
    next();
  });
};

export default auth;
