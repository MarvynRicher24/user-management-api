
import { IHandler } from '../Core/Mediator';
import { CreateUserCommand } from '../Commands/CreateUserCommand';
import { IUserRepositoryPort } from '../../Ports/IUserRepositoryPort';
import { UserInputDto } from '../../DTOs/UserInputDto';
import { toUserOutputDto } from '../../Mapping/UserMapper';
import { Email } from '../../../Domain/ValueObjects/Email';
import { Phone } from '../../../Domain/ValueObjects/Phone';
import { RoleAssigner } from '../../../Domain/Services/RoleAssigner';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../../../Domain/Entities/User';

export class CreateUserCommandHandler implements IHandler<CreateUserCommand, any> {
  constructor(private userRepo: IUserRepositoryPort) {}

  async handle(cmd: CreateUserCommand) {
    // Reuse existing logic from CreateUserUseCase
    const emailVO = Email.create(cmd.email);
    const phoneVO = Phone.create(cmd.phone ?? null);
    const role = RoleAssigner.assign(emailVO);

    const user = User.create({
      id: uuidv4(),
      firstName: cmd.firstName,
      lastName: cmd.lastName,
      email: emailVO,
      phone: phoneVO,
      role
    });

    const persisted = await this.userRepo.create(user.toPrimitives());
    return toUserOutputDto(persisted);
  }
}
