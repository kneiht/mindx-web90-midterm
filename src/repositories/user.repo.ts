import { Document, Schema } from 'mongoose';
import { User } from '../models/user.model';
import mongoose from 'mongoose';

export interface UserDocument extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  userName: string;
  passwordHash: string;
}

const userSchema = new Schema<UserDocument>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

export const UserModel = mongoose.model<UserDocument>('users', userSchema);

export async function createUser(
  email: string,
  userName: string,
  passwordHash: string
): Promise<User> {
  const user = new UserModel({
    email,
    userName,
    passwordHash,
  });
  const created = await user.save();
  return {
    id: created._id.toString(),
    email: created.email.toString(),
    userName: created.userName,
    passwordHash: created.passwordHash,
  };
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const user = await UserModel.findOne({ email });
  if (!user) return null;
  return {
    id: user._id.toString(),
    email: user.email.toString(),
    userName: user.userName,
    passwordHash: user.passwordHash,
  };
}
