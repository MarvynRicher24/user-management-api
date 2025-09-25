const { body, validationResult } = require('express-validator');

const userCreateValidation = [
  body('firstName').isString().notEmpty(),
  body('lastName').isString().notEmpty(),
  body('email').isEmail(),
  body('phone').optional().isMobilePhone('any'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];

const userUpdateValidation = [
  body('firstName').optional().isString(),
  body('lastName').optional().isString(),
  body('email').optional().isEmail(),
  body('phone').optional().isMobilePhone('any'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
  }
];

module.exports = { userCreateValidation, userUpdateValidation };