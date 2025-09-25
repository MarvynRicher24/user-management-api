const prisma = require('../prisma/client');

const create = async (data) => {
  return prisma.user.create({ data });
};

const findAll = async ({ skip = 0, take = 20 } = {}) => {
  return prisma.user.findMany({
    where: { deletedAt: null },
    skip,
    take,
    orderBy: { createdAt: 'desc' }
  });
};

const findById = async (id) => {
  return prisma.user.findUnique({ where: { id } });
};

const findByEmail = async (email) => {
  return prisma.user.findFirst({ where: { email, deletedAt: null } });
};

const update = async (id, data) => {
  return prisma.user.update({ where: { id }, data });
};

const softDelete = async (id) => {
  return prisma.user.update({ where: { id }, data: { deletedAt: new Date() } });
};

module.exports = { create, findAll, findById, findByEmail, update, softDelete };
