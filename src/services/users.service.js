const usersRepo = require('../repositories/users.repository');
const { assignRoleFromEmail } = require('../utils/role.util');

const createUser = async ({ firstName, lastName, email, phone }) => {
  // Business rules: unique email handled by DB; we can check before create to return friendly error
  const exists = await usersRepo.findByEmail(email);
  if (exists) {
    const err = new Error('Email already in use');
    err.status = 409;
    throw err;
  }
  const role = assignRoleFromEmail(email);
  const user = await usersRepo.create({ firstName, lastName, email, phone, role });
  return user;
};

const listUsers = async (page = 1, pageSize = 20) => {
  const skip = (Math.max(1, page) - 1) * pageSize;
  const users = await usersRepo.findAll({ skip, take: pageSize });
  return users;
};

const getUser = async (id) => {
  const user = await usersRepo.findById(id);
  if (!user || user.deletedAt) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }
  return user;
};

const updateUser = async (id, data) => {
  // If email is being changed, ensure uniqueness
  if (data.email) {
    const existing = await usersRepo.findByEmail(data.email);
    if (existing && existing.id !== id) {
      const err = new Error('Email already in use');
      err.status = 409;
      throw err;
    }
    // Reassign role based on new email
    data.role = assignRoleFromEmail(data.email);
  }

  try {
    const updated = await usersRepo.update(id, data);
    return updated;
  } catch (e) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }
};

const deleteUser = async (id) => {
  // Soft delete
  try {
    return await usersRepo.softDelete(id);
  } catch (e) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }
};

module.exports = { createUser, listUsers, getUser, updateUser, deleteUser };
