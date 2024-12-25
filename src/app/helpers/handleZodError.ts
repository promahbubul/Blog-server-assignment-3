/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { ZodError } from 'zod';
import httpStatus from 'http-status';

const handleZodError = (err: ZodError, res: Response) => {
  const issues = err?.issues?.map((issue: any) => ({
    path: issue.path.join(' '),
    message: issue.message,
  }));
  res.json({
    success: false,
    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
    message: err.name,
    issues,
    error: err,
  });
};

export default handleZodError;
