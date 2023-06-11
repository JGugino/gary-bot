/*
  Warnings:

  - You are about to drop the `Mickey` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Mickey";

-- CreateTable
CREATE TABLE "mickey" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "userID" TEXT NOT NULL,

    CONSTRAINT "mickey_pkey" PRIMARY KEY ("id")
);
