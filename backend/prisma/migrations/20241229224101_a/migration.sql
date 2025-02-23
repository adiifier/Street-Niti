/*
  Warnings:

  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Admin` table. All the data in the column will be lost.
  - The primary key for the `Application` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Application` table. All the data in the column will be lost.
  - The primary key for the `Permission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Permission` table. All the data in the column will be lost.
  - The primary key for the `Stall` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Stall` table. All the data in the column will be lost.
  - The primary key for the `Vendor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Vendor` table. All the data in the column will be lost.
  - The required column `adminId` was added to the `Admin` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `applicationId` was added to the `Application` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `permissionId` was added to the `Permission` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `stallId` was added to the `Stall` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `vendorId` was added to the `Vendor` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_applicationId_fkey";

-- DropForeignKey
ALTER TABLE "Stall" DROP CONSTRAINT "Stall_vendorId_fkey";

-- AlterTable
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_pkey",
DROP COLUMN "id",
ADD COLUMN     "adminId" TEXT NOT NULL,
ADD CONSTRAINT "Admin_pkey" PRIMARY KEY ("adminId");

-- AlterTable
ALTER TABLE "Application" DROP CONSTRAINT "Application_pkey",
DROP COLUMN "id",
ADD COLUMN     "applicationId" TEXT NOT NULL,
ADD CONSTRAINT "Application_pkey" PRIMARY KEY ("applicationId");

-- AlterTable
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_pkey",
DROP COLUMN "id",
ADD COLUMN     "permissionId" TEXT NOT NULL,
ADD CONSTRAINT "Permission_pkey" PRIMARY KEY ("permissionId");

-- AlterTable
ALTER TABLE "Stall" DROP CONSTRAINT "Stall_pkey",
DROP COLUMN "id",
ADD COLUMN     "stallId" TEXT NOT NULL,
ADD CONSTRAINT "Stall_pkey" PRIMARY KEY ("stallId");

-- AlterTable
ALTER TABLE "Vendor" DROP CONSTRAINT "Vendor_pkey",
DROP COLUMN "id",
ADD COLUMN     "vendorId" TEXT NOT NULL,
ADD CONSTRAINT "Vendor_pkey" PRIMARY KEY ("vendorId");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("vendorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("applicationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stall" ADD CONSTRAINT "Stall_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("vendorId") ON DELETE RESTRICT ON UPDATE CASCADE;
