import { Router } from 'express';

import authRoutes from './auth.routes';
import userRoutes from './users.routes';
import postRoutes from './posts.routes';

const router = Router();

// Mount routes with specific prefixes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);

export default router;
