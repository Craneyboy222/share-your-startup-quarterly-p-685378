/* Product model */

import prisma from '../lib/database';

export async function createStartup(data) {
  return prisma.startup.create({
    data
  });
}

export async function getStartupById(id) {
  return prisma.startup.findUnique({
    where: { id },
    include: {
      comments: true,
      votes: true,
      discountCodes: true
    }
  });
}

export async function listStartups() {
  return prisma.startup.findMany({
    include: {
      comments: true,
      votes: true
    }
  });
}