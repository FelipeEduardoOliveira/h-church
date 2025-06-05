/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TipoPessoa" AS ENUM ('MEMBRO', 'VISITANTE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SECRETARIO', 'PASTOR', 'MEMBRO');

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "pessoa" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "telefone" TEXT,
    "email" TEXT,
    "endereco" TEXT,
    "cidade" TEXT,
    "estado" TEXT,
    "tipo" "TipoPessoa" NOT NULL,
    "congregaEmOutra" BOOLEAN NOT NULL DEFAULT false,
    "membroDesde" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membro" (
    "id" TEXT NOT NULL,
    "pessoaId" TEXT NOT NULL,
    "cargo" TEXT,
    "batizado" BOOLEAN NOT NULL,

    CONSTRAINT "membro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visitante" (
    "id" TEXT NOT NULL,
    "pessoaId" TEXT NOT NULL,
    "primeiraVisita" TIMESTAMP(3) NOT NULL,
    "potencialMembro" BOOLEAN NOT NULL DEFAULT false,
    "observacoes" TEXT,

    CONSTRAINT "visitante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MEMBRO',
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "membro_pessoaId_key" ON "membro"("pessoaId");

-- CreateIndex
CREATE UNIQUE INDEX "visitante_pessoaId_key" ON "visitante"("pessoaId");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "membro" ADD CONSTRAINT "membro_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visitante" ADD CONSTRAINT "visitante_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
