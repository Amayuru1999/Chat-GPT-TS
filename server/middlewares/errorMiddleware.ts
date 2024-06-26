import { Request, Response, NextFunction } from 'express';
import errorResponse from '../utils/errorResponse';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error: any = { ...err };
  error.message = err.message;

  // mongoose cast Error
  if (err.name === "CastError") {
    const message = "Resource Not Found";
    error = new errorResponse(message, 404);
  }

  // duplicate key error
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new errorResponse(message, 400);
  }

  // mongoose validation
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val: any) => val.message).join(', '); // Join array of strings into a single string
    error = new errorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

export default errorHandler;
