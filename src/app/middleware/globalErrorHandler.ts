/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import handleZodError from '../helpers/handleZodError';
import handleDuplicateError from '../helpers/handleDuplicateError';
import mongoose from 'mongoose';
import handleValidationError from '../helpers/handleValidateionError';
import handleGenericError from '../helpers/handleGenericError';
import AppError from '../error/AppError';
import handleAppError from '../helpers/handleAppError';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err.name && err.name === 'ZodError') {
    handleZodError(err, res);
  } else if (err.code && err.code === 11000) {
    handleDuplicateError(err, res);
  } else if (err instanceof AppError) {
    handleAppError(err, res);
  } else if (err instanceof mongoose.Error.CastError) {
    handleValidationError(err, res);
  } else if (err instanceof Error) {
    handleGenericError(err, res);
  }
};

export default globalErrorHandler;
