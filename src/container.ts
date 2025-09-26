import { createContainer, asClass, asValue, AwilixContainer } from 'awilix';
import { PrismaUserRepository } from './Infrastructure/Persistence/PrismaUserRepository';
import { PrismaUnitOfWork } from './Infrastructure/Persistence/PrismaUnitOfWork';
import { CreateUserUseCase } from './Application/UseCases/CreateUserUseCase';
import { ListUsersUseCase } from './Application/UseCases/ListUsersUseCase';
import { GetUserUseCase } from './Application/UseCases/GetUserUseCase';
import { UpdateUserUseCase } from './Application/UseCases/UpdateUserUseCase';
import { DeleteUserUseCase } from './Application/UseCases/DeleteUserUseCase';
import { prisma } from './prisma/client';
import { UserController } from './controllers/UserController';

export const container: AwilixContainer = createContainer();

container.register({
  // infra
  prismaClient: asValue(prisma),
  unitOfWork: asClass(PrismaUnitOfWork).scoped(),
  userRepository: asClass(PrismaUserRepository).scoped(),

  // application (use cases)
  createUserUseCase: asClass(CreateUserUseCase).scoped(),
  listUsersUseCase: asClass(ListUsersUseCase).scoped(),
  getUserUseCase: asClass(GetUserUseCase).scoped(),
  updateUserUseCase: asClass(UpdateUserUseCase).scoped(),
  deleteUserUseCase: asClass(DeleteUserUseCase).scoped(),

  // presentation
  userController: asClass(UserController).scoped()
});
