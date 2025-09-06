import { Document, Schema, Types } from 'mongoose';
import mongoose from 'mongoose';

export interface PostDocument extends Document {
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
