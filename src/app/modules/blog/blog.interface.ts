import mongoose from 'mongoose';
export type TBlog = {
  title: string;
  content: string;
  author: mongoose.ObjectId;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
};
