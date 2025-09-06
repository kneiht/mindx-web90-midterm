import { Document, Schema, Types } from 'mongoose';
import mongoose from 'mongoose';
import { Post } from '../models/post.model.js';

export interface PostDocument extends Document {
  _id: mongoose.Types.ObjectId;
  userId: Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<PostDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export const PostModel = mongoose.model<PostDocument>('posts', postSchema);

// Create a new post
export async function createPost(userId: string, content: string): Promise<Post> {
  const post = new PostModel({
    userId: new Types.ObjectId(userId),
    content,
  });
  const created = await post.save();
  return {
    id: created._id.toString(),
    userId: created.userId.toString(),
    content: created.content,
    createdAt: created.createdAt,
    updatedAt: created.updatedAt,
  };
}

// Get post by ID
export async function findPostById(id: string): Promise<Post | null> {
  const post = await PostModel.findById(id);
  if (!post) return null;
  return {
    id: post._id.toString(),
    userId: post.userId.toString(),
    content: post.content,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
}

// Update post
export async function updatePost(id: string, content: string): Promise<Post | null> {
  const post = await PostModel.findByIdAndUpdate(
    id,
    {
      content,
      updatedAt: new Date(),
    },
    { new: true }
  );
  if (!post) return null;
  return {
    id: post._id.toString(),
    userId: post.userId.toString(),
    content: post.content,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
}

// Get posts by user ID
export async function getPostsByUserId(userId: string): Promise<Post[]> {
  const posts = await PostModel.find({ userId });
  return posts.map(post => ({
    id: post._id.toString(),
    userId: post.userId.toString(),
    content: post.content,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  }));
}
