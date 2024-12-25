/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import httpStatus from 'http-status';

const handleValidationError = (err: any, res: Response) => {
  const issues = Object.values(err.error).map((item: any) => {
    return {
      name: item.name,
      path: item.path,
      message: item.message,
    };
  });

  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
    status: false,
    message: err.message,
    issues: issues,
    error: err,
  });
};

export default handleValidationError;
