import express, { Request, Response } from 'express';
import cors from 'cors';
import blogRouter from './app/modules/blog/blog.route';
import userRouter from './app/modules/user/user.route';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFound';
import AdminRouter from './app/modules/admin/admin.route';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/blogs', blogRouter);
app.use('/api/auth', userRouter);
app.use('/api/admin', AdminRouter);

// Root Directory
app.get('/', (req: Request, res: Response) => {
  res.send({
    success: true,
    message: 'Blog server running',
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
