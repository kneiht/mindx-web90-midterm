import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('\n\n');
  console.log(`${req.method}: ${req.url}`);
  res.on('finish', () => {
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    console.log('Response:', res.statusCode, res.statusMessage);
  });
  next();
}
