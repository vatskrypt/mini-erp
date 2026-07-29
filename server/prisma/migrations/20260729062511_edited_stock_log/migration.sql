/*
  Warnings:

  - You are about to drop the column `reason` on the `StockLog` table. All the data in the column will be lost.
  - Added the required column `stockAfter` to the `StockLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StockLog" DROP COLUMN "reason",
ADD COLUMN     "remarks" TEXT,
ADD COLUMN     "stockAfter" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "StockLog_createdAt_idx" ON "StockLog"("createdAt");
