/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import httpStatus from 'http-status';

const handleGenericError = (err: any, res: Response) => {
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    status: false,
    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
    message: err.message,
    error: err,
  });
};

export default handleGenericError;
