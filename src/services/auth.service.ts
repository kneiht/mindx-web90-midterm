import { createUser, findUserByEmail } from '../repositories/user.repo';
import { User } from '../models/user.model';
import { hashPassword, comparePassword } from '../utils/password';
import { generateAccessToken, verifyToken } from '../utils/jwt';

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
  passwordHash: string
): Promise<{ user: User; token: string } | null> {
  // Find user by email
  const user = await findUserByEmail(email);
  if (!user) {
    return null;
  }

  // Compare password
  const isMatch = await comparePassword(passwordHash, user.passwordHash);

  // Check if passwordHash matches
  if (isMatch) {
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
