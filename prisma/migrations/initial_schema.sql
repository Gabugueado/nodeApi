-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Habit" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Habit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HabitDetail" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "habitDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "idHabit" INTEGER NOT NULL,

    CONSTRAINT "HabitDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HabitsOnUsers" (
    "idHabit" INTEGER NOT NULL,
    "idUser" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT,

    CONSTRAINT "HabitsOnUsers_pkey" PRIMARY KEY ("idHabit","idUser")
);

-- CreateTable
CREATE TABLE "public"."Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserRole" (
    "idUser" INTEGER NOT NULL,
    "idRole" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("idUser","idRole")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_id_key" ON "public"."Role"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_idUser_key" ON "public"."UserRole"("idUser");

-- AddForeignKey
ALTER TABLE "public"."HabitDetail" ADD CONSTRAINT "HabitDetail_idHabit_fkey" FOREIGN KEY ("idHabit") REFERENCES "public"."Habit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HabitsOnUsers" ADD CONSTRAINT "HabitsOnUsers_idHabit_fkey" FOREIGN KEY ("idHabit") REFERENCES "public"."Habit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HabitsOnUsers" ADD CONSTRAINT "HabitsOnUsers_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserRole" ADD CONSTRAINT "UserRole_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserRole" ADD CONSTRAINT "UserRole_idRole_fkey" FOREIGN KEY ("idRole") REFERENCES "public"."Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

