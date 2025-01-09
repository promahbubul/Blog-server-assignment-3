import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';
import httpStatus from 'http-status';

const register = catchAsync(async (req, res) => {
  const result = await UserService.register(req.body);
  sendResponse(res, {
    status: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: { _id: result._id, name: result.name, email: result.email },
  });
});

const login = catchAsync(async (req, res) => {
  const result = await UserService.login(req.body);
  sendResponse(res, {
    status: true,
    statusCode: httpStatus.OK,
    message: 'Login successfully',
    data: result,
  });
});

export const UserController = {
  register,
  login,
};
