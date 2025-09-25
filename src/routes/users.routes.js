const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users.controller');
const { userCreateValidation, userUpdateValidation } = require('../middlewares/validation.middleware');

router.get('/', usersCtrl.list);
router.get('/:id', usersCtrl.getById);
router.post('/', userCreateValidation, usersCtrl.create);
router.put('/:id', userUpdateValidation, usersCtrl.update);
router.delete('/:id', usersCtrl.remove);

module.exports = router;