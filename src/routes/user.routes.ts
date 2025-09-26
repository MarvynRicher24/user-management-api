import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { container } from '../container';
import { userCreateValidation, userUpdateValidation } from '../middlewares/validation.middleware';

const router = Router();
const userController = container.resolve<UserController>('userController');

router.get('/', userController.list);
router.get('/:id', userController.getById);
router.post('/', userCreateValidation, userController.create);
router.put('/:id', userUpdateValidation, userController.update);
router.delete('/:id', userController.remove);

export default router;
