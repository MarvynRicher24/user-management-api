
import { IHandler } from '../Core/Mediator';
import { DeleteUserCommand } from '../Commands/DeleteUserCommand';
import { IUserRepositoryPort } from '../../Ports/IUserRepositoryPort';

export class DeleteUserCommandHandler implements IHandler<DeleteUserCommand, any> {
  constructor(private userRepo: IUserRepositoryPort) {}

  async handle(cmd: DeleteUserCommand) {
    await this.userRepo.softDelete(cmd.id);
    return null;
  }
}
