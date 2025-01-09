/* eslint-disable @typescript-eslint/no-this-alias */

import { model, Schema } from 'mongoose';
import { IUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config/config';

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'Email must be required'],
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Name must be required'],
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const blog = this;
  blog.password = await bcrypt.hash(blog.password, Number(config.salt_round));
  next();
});

const User = model<IUser>('User', userSchema);

export default User;
