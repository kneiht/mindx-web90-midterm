import { authenticateToken } from '../middleware/auth.middleware';
import { Router } from 'express';
import type { Router as ExpressRouter } from 'express';

const router: ExpressRouter = Router();

// Apply auth middleware to all routes in this router
router.use(authenticateToken);

router.get('/', (req, res) => {
  return res.json({
    message: 'get posts',
  });
});

export default router;
