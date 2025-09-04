/*
  Warnings:

  - The primary key for the `HabitsOnUsers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `habitId` on the `HabitsOnUsers` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `HabitsOnUsers` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - Added the required column `idHabit` to the `HabitsOnUsers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUser` to the `HabitsOnUsers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."HabitsOnUsers" DROP CONSTRAINT "HabitsOnUsers_habitId_fkey";

-- DropForeignKey
ALTER TABLE "public"."HabitsOnUsers" DROP CONSTRAINT "HabitsOnUsers_userId_fkey";

-- AlterTable
ALTER TABLE "public"."HabitsOnUsers" DROP CONSTRAINT "HabitsOnUsers_pkey";

ALTER TABLE "public"."HabitsOnUsers" 
RENAME COLUMN "habitId" TO "idHabit";

ALTER TABLE "public"."HabitsOnUsers" 
RENAME COLUMN "userId" TO "idUser";

ALTER TABLE "public"."HabitsOnUsers"
ADD CONSTRAINT "HabitsOnUsers_pkey" PRIMARY KEY ("idHabit", "idUser");

-- AlterTable
ALTER TABLE "public"."User" 
DROP COLUMN "role";

-- CreateTable
CREATE TABLE "public"."UserRole" (
    "idUser" INTEGER NOT NULL,
    "idRole" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("idUser","idRole")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_idUser_key" ON "public"."UserRole"("idUser");

-- AddForeignKey
ALTER TABLE "public"."HabitsOnUsers" ADD CONSTRAINT "HabitsOnUsers_idHabit_fkey" FOREIGN KEY ("idHabit") REFERENCES "public"."Habit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HabitsOnUsers" ADD CONSTRAINT "HabitsOnUsers_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserRole" ADD CONSTRAINT "UserRole_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserRole" ADD CONSTRAINT "UserRole_idRole_fkey" FOREIGN KEY ("idRole") REFERENCES "public"."Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
