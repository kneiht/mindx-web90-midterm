import type { Response } from 'express';
import type { SuccessResponse, ErrorReponse } from '../types/api.type';

// Success response helper
export function success<T>(res: Response, data: T, message = 'Success', statusCode = 200) {
  const response: SuccessResponse<T> = {
    success: true,
    message,
    data,
    statusCode,
  };
  return res.status(statusCode).json(response);
}

// Error response helper
export function error(res: Response, message = 'Error', statusCode = 400) {
  const response: ErrorReponse = {
    success: false,
    message,
    error: message,
    statusCode,
  };
  return res.status(statusCode).json(response);
}

// Created response helper
export function created<T>(
  res: Response,
  data: T,
  message = 'Created successfully',
  statusCode = 201
) {
  return success(res, data, message, statusCode);
}

// Not found response helper
export function notFound(res: Response, message = 'Not found', statusCode = 404) {
  return error(res, message, statusCode);
}

// Internal server error response helper
export function serverError(res: Response, message = 'Internal server error', statusCode = 500) {
  return error(res, message, statusCode);
}
