import { createUser, findUserByEmail } from '../repositories/user.repo.js';
import { User } from '../models/user.model.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateAccessToken, verifyToken } from '../utils/jwt.js';

export async function registerUser(
  email: string,
  userName: string,
  password: string
): Promise<{
  user: User;
  token: string;
}> {
  // Hash password
  const passwordHash = await hashPassword(password);

  // User createUser from user repo
  const user = await createUser(email, userName, passwordHash);

  // Generate access token
  const token = generateAccessToken({
    userId: user.id,
    email: user.email,
    username: user.userName,
  });

  return {
    user,
    token,
  };
}

export async function loginUser(
  email: string,
  password: string
): Promise<{ user: User; token: string } | null> {
  // Find user by email
  const user = await findUserByEmail(email);
  if (!user) {
    return null;
  }

  // Compare password with stored hash
  const isMatch = await comparePassword(password, user.passwordHash);

  // Check if password doesn't match
  if (!isMatch) {
    return null;
  }

  // Generate access token
  const token = generateAccessToken({
    userId: user.id,
    email: user.email,
    username: user.userName,
  });

  return {
    user,
    token,
  };
}

// verify token and return user
export async function verifyUser(token: string): Promise<User | null> {
  // Verify token
  const { userId, email, username } = verifyToken(token);

  // Find user by email
  const user = await findUserByEmail(email);
  if (!user) {
    return null;
  }

  return user;
}
