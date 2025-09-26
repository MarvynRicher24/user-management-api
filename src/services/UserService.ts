import { IUserService } from '../interfaces/IUserService';
import { IUserRepository } from '../interfaces/IUserRepository';
import { User } from '../entities/User.entity';
import { UserCreateDto } from '../dtos/UserCreateDto';
import { UserUpdateDto } from '../dtos/UserUpdateDto';
import { assignRoleFromEmail } from '../utils/role.util';

export class UserService implements IUserService {
  constructor(private userRepo: IUserRepository) {}

  async createUser(data: UserCreateDto): Promise<User> {
    const exists = await this.userRepo.findByEmail(data.email);
    if (exists) {
      const err: any = new Error('Email already in use');
      err.status = 409;
      throw err;
    }
    const role = assignRoleFromEmail(data.email);
    const user = await this.userRepo.create({ ...data, role });
    return user;
  }

  async listUsers(page = 1, pageSize = 20): Promise<User[]> {
    const skip = (page - 1) * pageSize;
    return this.userRepo.findAll(skip, pageSize);
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userRepo.findById(id);
    if (!user) {
      const err: any = new Error('User not found');
      err.status = 404;
      throw err;
    }
    return user;
  }

  async updateUser(id: string, data: UserUpdateDto): Promise<User> {
    const user = await this.userRepo.findById(id);
    if (!user) {
      const err: any = new Error('User not found');
      err.status = 404;
      throw err;
    }

    if (data.email && data.email !== user.email) {
      const other = await this.userRepo.findByEmail(data.email);
      if (other && other.id !== id) {
        const err: any = new Error('Email already in use');
        err.status = 409;
        throw err;
      }
    }

    const updated = await this.userRepo.update(id, data);
    return updated;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepo.findById(id);
    if (!user) {
      const err: any = new Error('User not found');
      err.status = 404;
      throw err;
    }
    await this.userRepo.softDelete(id);
  }
}
