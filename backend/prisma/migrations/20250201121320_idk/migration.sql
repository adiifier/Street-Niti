/*
  Warnings:

  - Added the required column `name` to the `Stall` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stall" ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "pictureUrl" DROP NOT NULL;
