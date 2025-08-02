import { PrismaClient } from '@prisma/client';
import users from './seed/users';
import startups from './seed/startups';
import comments from './seed/comments';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({ data: users });
  await prisma.startup.createMany({ data: startups });
  await prisma.comment.createMany({ data: comments });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });