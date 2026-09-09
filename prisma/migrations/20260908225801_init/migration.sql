-- CreateEnum
CREATE TYPE "MembershipOrigin" AS ENUM ('ACCLAIMED', 'BAPTIZED');

-- CreateEnum
CREATE TYPE "MembershipMaritalStatus" AS ENUM ('SINGLE', 'MARRIED', 'WIDOW');

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birthday" DATE NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "conversionDate" TIMESTAMP(3),
    "membershipOrigin" "MembershipOrigin" NOT NULL,
    "membershipMaritalStatus" "MembershipMaritalStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_cpf_key" ON "Member"("cpf");
