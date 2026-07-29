/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Challan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Challan" DROP COLUMN "createdAt",
ADD COLUMN     "challanDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
