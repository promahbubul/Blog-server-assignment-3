import { Router } from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './usesr.validation';
import validateRequest from '../../middleware/validateRequest';
import { loginValidation } from '../auth/auth.validation';
// import { UserValidation } from './usesr.validation';

const userRouter = Router();

userRouter.post(
  '/register',
  validateRequest(UserValidation.userRegisterValidationSchema),
  UserController.register,
);

userRouter.post(
  '/login',
  validateRequest(loginValidation.loginValidationSchema),
  UserController.login,
);
export default userRouter;
