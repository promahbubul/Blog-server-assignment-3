import { Response } from 'express';
import mongoose from 'mongoose';
import httpStatus from 'http-status';

const handleDuplicateError = (err: mongoose.Error.CastError, res: Response) => {
  res.json({
    success: false,
    statusCode: httpStatus.INTERNAL_SERVER_ERROR,
    message: err.message,
    error: err,
  });
};

export default handleDuplicateError;
