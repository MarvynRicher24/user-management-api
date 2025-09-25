const userService = require('../services/users.service');

const create = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) { next(err); }
};

const list = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20;
    const users = await userService.listUsers(page, pageSize);
    res.json(users);
  } catch (err) { next(err); }
};

const getById = async (req, res, next) => {
  try {
    const user = await userService.getUser(req.params.id);
    res.json(user);
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const updated = await userService.updateUser(req.params.id, req.body);
    res.json(updated);
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(204).send();
  } catch (err) { next(err); }
};

module.exports = { create, list, getById, update, remove };
