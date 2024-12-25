/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TRole = 'admin' | 'user';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: TRole;
  isBlocked: boolean;
}

export interface IUserDocument extends Model<IUser> {
  isExists(email: string): Promise<boolean>;
}
