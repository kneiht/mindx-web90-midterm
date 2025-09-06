import { Router } from 'express';

import authRoutes from './auth.routes.js';
import postRoutes from './posts.routes.js';

const router = Router();

// Mount routes with specific prefixes
router.use('/auth', authRoutes);
router.use('/posts', postRoutes);

export default router;
