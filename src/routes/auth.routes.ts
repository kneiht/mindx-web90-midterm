import { Router } from 'express';
import type { Router as ExpressRouter, Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service';
import { created, loggedIn, success } from '../utils/response';

const router: ExpressRouter = Router();

router.post('/auth/register', async (req: Request, res: Response) => {
  const { email, userName, passwordHash } = req.body;
  const user = await registerUser(email, userName, passwordHash);
  return created(res, user);
});

router.post('/auth/login', async (req: Request, res: Response) => {
  const { email, passwordHash } = req.body;
  const user = await loginUser(email, passwordHash);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  return loggedIn(res, user);
});

export default router;
