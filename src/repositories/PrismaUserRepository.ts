import { IUserRepository } from '../interfaces/IUserRepository';
import { prisma } from '../prisma/client';
import { User } from '../entities/User.entity';
import { UserCreateDto } from '../dtos/UserCreateDto';
import { UserUpdateDto } from '../dtos/UserUpdateDto';

export class PrismaUserRepository implements IUserRepository {
  async create(data: UserCreateDto & { role: string }): Promise<User> {
    const created = await prisma.user.create({ data });
    return created as unknown as User;
  }

  async findAll(skip = 0, take = 20): Promise<User[]> {
    const users = await prisma.user.findMany({
      where: { deletedAt: null },
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });
    return users as unknown as User[];
  }

  async findById(id: string): Promise<User | null> {
    const u = await prisma.user.findUnique({ where: { id } });
    if (!u || u.deletedAt) return null;
    return u as unknown as User;
  }

  async findByEmail(email: string): Promise<User | null> {
    const u = await prisma.user.findFirst({ where: { email, deletedAt: null } });
    return u as unknown as User | null;
  }

  async update(id: string, data: UserUpdateDto): Promise<User> {
    const updated = await prisma.user.update({ where: { id }, data });
    return updated as unknown as User;
  }

  async softDelete(id: string): Promise<User> {
    const deleted = await prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return deleted as unknown as User;
  }
}
