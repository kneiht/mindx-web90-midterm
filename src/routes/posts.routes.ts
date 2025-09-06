import { Router } from 'express';
import type { Router as ExpressRouter, Request, Response } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import {
  createNewPost,
  getPostById,
  updateExistingPost,
  getPostsByUser,
} from '../services/post.service';
import { User } from '../models/user.model';
import { created, notFound, success, serverError, badRequest } from '../utils/response';

const router: ExpressRouter = Router();

// Apply auth middleware
router.use(authenticateToken);

// Get all posts from user
router.get('/', async (req: Request, res: Response) => {
  // @ts-ignore
  const user = req.user as User;

  const posts = await getPostsByUser(user.id);
  return success(res, posts);
});

// Get post by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await getPostById(id);

    if (!post) {
      return notFound(res);
    }

    return success(res, post);
  } catch (err) {
    return serverError(res);
  }
});

// Create new post
router.post('/', async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const user = req.user as User;
    const userId = user.id;
    const { content } = req.body;

    // Validation
    if (!content) {
      return badRequest(res);
    }

    const post = await createNewPost(userId, content);
    return created(res, { post });
  } catch (error) {
    return serverError(res);
  }
});

// Update post
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
      return badRequest(res);
    }

    const post = await updateExistingPost(id, content);

    if (!post) {
      return notFound(res);
    }

    return success(res, post);
  } catch (error) {
    return serverError(res);
  }
});

export default router;
