import { Router } from 'express';

import authRoutes from './auth.routes';
import userRoutes from './users.routes';
import postRoutes from './posts.routes';

const router = Router();

router.use(authRoutes);
router.use(userRoutes);
router.use(postRoutes);

export default router;
