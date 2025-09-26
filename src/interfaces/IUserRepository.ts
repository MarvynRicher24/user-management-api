import { User } from '../entities/User.entity';
import { UserCreateDto } from '../dtos/UserCreateDto';
import { UserUpdateDto } from '../dtos/UserUpdateDto';

export interface IUserRepository {
  create(data: UserCreateDto & { role: string }): Promise<User>;
  findAll(skip?: number, take?: number): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(id: string, data: UserUpdateDto): Promise<User>;
  softDelete(id: string): Promise<User>;
}
