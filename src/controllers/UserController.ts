import { Request, Response, NextFunction } from 'express';
import { CreateUserUseCase } from '../Application/UseCases/CreateUserUseCase';
import { ListUsersUseCase } from '../Application/UseCases/ListUsersUseCase';
import { GetUserUseCase } from '../Application/UseCases/GetUserUseCase';
import { UpdateUserUseCase } from '../Application/UseCases/UpdateUserUseCase';
import { DeleteUserUseCase } from '../Application/UseCases/DeleteUserUseCase';
import { UserInputDto } from '../Application/DTOs/UserInputDto';
import { UserUpdateDto } from '../Application/DTOs/UserUpdateDto';

export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private listUsersUseCase: ListUsersUseCase,
    private getUserUseCase: GetUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase
  ) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto: UserInputDto = req.body;
      const result = await this.createUserUseCase.execute(dto);
      return res.status(201).json(result);
    } catch (err: any) {
      return next(err);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Number(req.query.page) || 1;
      const pageSize = Number(req.query.pageSize) || 20;
      const result = await this.listUsersUseCase.execute(page, pageSize);
      return res.json(result);
    } catch (err: any) {
      return next(err);
    }
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const result = await this.getUserUseCase.execute(id);
      return res.json(result);
    } catch (err: any) {
      return next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const dto: UserUpdateDto = req.body;
      const result = await this.updateUserUseCase.execute(id, dto);
      return res.json(result);
    } catch (err: any) {
      return next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      await this.deleteUserUseCase.execute(id);
      return res.status(204).send();
    } catch (err: any) {
      return next(err);
    }
  };
}
