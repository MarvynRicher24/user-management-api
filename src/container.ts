import { createContainer, asClass, AwilixContainer } from 'awilix';
import { PrismaUserRepository } from './repositories/PrismaUserRepository';
import { UserService } from './services/UserService';
import { UserController } from './controllers/UserController';

export const container: AwilixContainer = createContainer();

container.register({
  userRepository: asClass(PrismaUserRepository).singleton(),
  userService: asClass(UserService).singleton(),
  userController: asClass(UserController).singleton(),
});

export default container;
