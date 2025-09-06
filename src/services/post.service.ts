import {
  createPost,
  findPostById,
  updatePost,
  getPostsByUserId,
} from '../repositories/post.repo.js';
import { Post } from '../models/post.model.js';

// Create a new post
export async function createNewPost(userId: string, content: string): Promise<Post> {
  // Basic validation
  if (!content.trim()) {
    throw new Error('Post content is required');
  }

  return await createPost(userId, content);
}

// Get post by ID
export async function getPostById(id: string): Promise<Post | null> {
  if (!id) {
    throw new Error('Post ID is required');
  }
  return await findPostById(id);
}

// Update existing post
export async function updateExistingPost(id: string, content: string): Promise<Post | null> {
  if (!id) {
    throw new Error('Post ID is required');
  }

  // Validation
  if (!content.trim()) {
    throw new Error('Post content is required');
  }
  return await updatePost(id, content.trim());
}

// Get posts by user ID
export async function getPostsByUser(userId: string): Promise<Post[]> {
  if (!userId) {
    throw new Error('User ID is required');
  }
  return await getPostsByUserId(userId);
}
