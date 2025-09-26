import { User } from '../entities/User.entity';
import { UserCreateDto } from '../dtos/UserCreateDto';
import { UserUpdateDto } from '../dtos/UserUpdateDto';

export interface IUserService {
  createUser(data: UserCreateDto): Promise<User>;
  listUsers(page?: number, pageSize?: number): Promise<User[]>;
  getUser(id: string): Promise<User>;
  updateUser(id: string, data: UserUpdateDto): Promise<User>;
  deleteUser(id: string): Promise<void>;
}
