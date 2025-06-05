import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export async function createUsers(prisma: PrismaClient) {
  await prisma.usuario.create({
    data: {
      email: 'felipe@hchurch.com.br',
      nome: 'Felipe Oliveira',
      senha: await bcrypt.hash('1234', SALT_ROUNDS),
      ativo: true,
      role: 'ADMIN',
    },
  });
}
