-- CreateTable
CREATE TABLE "ApplicationImage" (
    "imageId" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApplicationImage_pkey" PRIMARY KEY ("imageId")
);

-- CreateIndex
CREATE INDEX "ApplicationImage_applicationId_idx" ON "ApplicationImage"("applicationId");

-- AddForeignKey
ALTER TABLE "ApplicationImage" ADD CONSTRAINT "ApplicationImage_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("applicationId") ON DELETE RESTRICT ON UPDATE CASCADE;
