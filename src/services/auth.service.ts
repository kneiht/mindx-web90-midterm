import { createUser, findUserByEmail } from '../repositories/user.repo';
import { User } from '../models/user.model';
import { hashPassword, comparePassword } from '../utils/password';

export async function registerUser(
  email: string,
  userName: string,
  password: string
): Promise<User> {
  // Hash password
  const passwordHash = await hashPassword(password);

  // User createUser from user repo
  const user = await createUser(email, userName, passwordHash);
  return user;
}

export async function loginUser(email: string, passwordHash: string): Promise<User | null> {
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
  return user;
}
