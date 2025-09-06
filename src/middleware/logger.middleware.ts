import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`${req.method}: ${req.url}`);
  res.on('finish', () => {
    console.log('Body:', req.body);
  });
  next();
}
