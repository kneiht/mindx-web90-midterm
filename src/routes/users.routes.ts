import { Router } from 'express';
import type { Router as ExpressRouter } from 'express';
import { getUsers } from '../services/user.service';

const router: ExpressRouter = Router();

router.get('/', async (req, res) => {
  const users = await getUsers();
  return res.json(users);
});

export default router;
