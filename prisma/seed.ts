import { PrismaClient } from '@prisma/client';
import { createUsers } from './seeds/createUser';

const prisma = new PrismaClient();

async function main() {
  await createUsers(prisma);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
