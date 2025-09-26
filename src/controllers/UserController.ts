import { Request, Response, NextFunction } from 'express';
import { IUserService } from '../interfaces/IUserService';
import { UserCreateDto } from '../dtos/UserCreateDto';
import { UserUpdateDto } from '../dtos/UserUpdateDto';

export class UserController {
  constructor(private userService: IUserService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as UserCreateDto;
      const created = await this.userService.createUser(body);
      res.status(201).json(created);
    } catch (err) { next(err); }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 20;
      const users = await this.userService.listUsers(page, pageSize);
      res.json(users);
    } catch (err) { next(err); }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.getUser(req.params.id);
      res.json(user);
    } catch (err) { next(err); }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body as UserUpdateDto;
      const updated = await this.userService.updateUser(req.params.id, body);
      res.json(updated);
    } catch (err) { next(err); }
  };

  remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.userService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (err) { next(err); }
  };
}
