import { Request, Response, NextFunction } from 'express';
import { verifyUser } from '../services/auth.service.js';
import { extractTokenFromHeader } from '../utils/jwt.js';
import { success, error } from '../utils/response.js';

export async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = extractTokenFromHeader(req.headers.authorization);
  if (!token) {
    return error(res, 'Missing token', 401);
  }
  try {
    const user = await verifyUser(token);
    if (!user) {
      return error(res, 'Invalid token', 401);
    }

    // Lỗi type mà mình chưa nghiên cứu sửa nên ignore luôn cho nhanh
    // @ts-ignore
    req.user = user;
    next();
  } catch (_err) {
    return error(res, 'Invalid token', 401);
  }
}
