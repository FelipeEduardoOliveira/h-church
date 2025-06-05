// src/prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // torna disponível globalmente (opcional)
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
