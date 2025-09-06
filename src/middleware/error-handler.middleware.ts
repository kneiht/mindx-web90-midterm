import { serverError } from '../utils/response.js';
import type { Request, Response, NextFunction } from 'express';
import app from '../app.js';

export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
  const env = app.config.env;
  const message = env === 'development' ? err.message : 'Something went wrong!';
  if (env === 'development') {
    console.log(err.stack);
  }
  serverError(res, message);
}
