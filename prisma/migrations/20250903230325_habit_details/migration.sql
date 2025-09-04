-- CreateTable
CREATE TABLE "public"."HabitDetail" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "habitDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "idHabit" INTEGER NOT NULL,

    CONSTRAINT "HabitDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."HabitDetail" ADD CONSTRAINT "HabitDetail_idHabit_fkey" FOREIGN KEY ("idHabit") REFERENCES "public"."Habit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
