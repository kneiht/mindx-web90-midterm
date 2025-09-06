import { getAllUsers } from '../repositories/user.repo';

export async function getUsers() {
  return await getAllUsers();
}
