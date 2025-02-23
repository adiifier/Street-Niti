-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_userId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "Stall" DROP CONSTRAINT "Stall_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "Vendor" DROP CONSTRAINT "Vendor_userId_fkey";

-- AddForeignKey
ALTER TABLE "Vendor" ADD CONSTRAINT "Vendor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("vendorId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stall" ADD CONSTRAINT "Stall_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("vendorId") ON DELETE CASCADE ON UPDATE CASCADE;
