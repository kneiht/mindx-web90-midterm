import type { Response } from 'express';
import type { SuccessResponse, ErrorReponse } from '../types/api.type.js';

// Success response helper
export function success<T>(res: Response, data: T, message = 'Success', statusCode = 200) {
  const response: SuccessResponse<T> = {
    success: true,
    message,
    data,
    statusCode,
  };
  console.log(response);
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
  console.log(response);
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

// Logged in response helper
export function loggedIn<T>(
  res: Response,
  data: T,
  message = 'Login successful',
  statusCode = 200
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

// Bad request response helper
export function badRequest(res: Response, message = 'Bad request', statusCode = 400) {
  return error(res, message, statusCode);
}
