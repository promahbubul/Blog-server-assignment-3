import { Response } from 'express';

type TSuccessResponse<T> = {
  status?: boolean;
  message: string;
  statusCode: number;
  token?: string;
  data?: T | T[] | null;
};

const sendResponse = <T>(res: Response, data: TSuccessResponse<T>) => {
  res.status(data.statusCode).json({
    status: data.status,
    statusCode: data.statusCode,
    message: data.message,
    token: data.token,
    data: data.data,
  });
};

export default sendResponse;
