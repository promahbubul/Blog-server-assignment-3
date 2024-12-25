import { Router } from 'express';
import auth from '../auth/auth';
import { AdminController } from './admin.controller';

const AdminRouter = Router();

AdminRouter.patch(
  '/users/:userId/block',
  auth('admin'),
  AdminController.blockUser,
);

AdminRouter.delete('/blogs/:id', auth('admin'), AdminController.deleteUser);

export default AdminRouter;
