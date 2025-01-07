import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminService } from './admin.service';
import httpStatus from 'http-status';

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  await AdminService.userBlock(userId, req.user as JwtPayload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'User blocked successfully',
  });
});

const deleteUser = catchAsync(async (req, res) => {
  await AdminService.userDelete(req.params.id, req.user as JwtPayload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    status: true,
    message: 'Blog deleted successfully',
  });
});

export const AdminController = {
  blockUser,
  deleteUser,
};
